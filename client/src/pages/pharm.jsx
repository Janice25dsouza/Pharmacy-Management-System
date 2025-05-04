import React, { useEffect, useState } from 'react';
import PhNavbar from '../components/PhNavbar';
import MedOrderCard from '../components/MedOrderCard';
import axios from 'axios';

const Pharmacy = () => {
  const [medicines, setMedicines] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [showExistCustModal, setShowExistCustModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showGenBillButton, setShowGenBillButton] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [formData, setFormData] = useState({
    Customer_ID: '',
    Name: '',
    Contact_Number: '',
    Address: ''
  });
  const [selectedCustomer, setSelectedCustomer] = useState({
    name: '',
    contactNumber: ''
  });
  const [prescriptionData, setPrescriptionData] = useState({
    customerId: '',
    doctorName: '',
    prescriptionDate: '',
    validityDate: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const fetchMedicines = async () => {
    try {
      const res = await axios.get('http://localhost:5000/update/get-medicine');
      setMedicines(res.data.data);
    } catch (err) {
      console.error('Error fetching medicines:', err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleConfirmationModal = () => {
    const cart = JSON.parse(localStorage.getItem('medicineCart')) || {};
    const items = Object.entries(cart).map(([medicineId, quantity]) => {
      const medicine = medicines.find(med => med.Medicine_ID.toString() === medicineId);
      return {
        name: medicine ? medicine.Medicine_Name : `Unknown (${medicineId})`,
        quantity: quantity
      };
    });
    setCartItems(items);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = () => {
    setShowConfirmationModal(false);
    setShowModalCustomer(true);
  };

  const handleNewCustomer = () => {
    setShowModalCustomer(false);
    setShowNewCustomerModal(true);
    setFormData({ Customer_ID: '', Name: '', Contact_Number: '', Address: '' });
    setError('');
  };

  const handleExistingCustomer = () => {
    setShowModalCustomer(false);
    setShowExistCustModal(true);
  };

  const getNewCustomerID = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/pharmacy/newuserid');
      const lastId = res.data.data ? res.data.data.Customer_ID : 0;
      return lastId + 1;
    } catch (err) {
      console.error('Error fetching last customer id:', err);
      setError('Failed to generate customer ID. Please try again.');
      return null;
    }
  };

  const handleNewCustomerEnter = async () => {
    if (!formData.Name || !formData.Contact_Number || !formData.Address) {
      setError('Please fill in all required fields.');
      return;
    }
    const newCustomerId = await getNewCustomerID();
    if (!newCustomerId) {
      return;
    }
    const updatedFormData = {
      ...formData,
      Customer_ID: newCustomerId
    };
    setFormData(updatedFormData);
    setSelectedCustomerId(newCustomerId);
    try {
      await axios.post('http://localhost:5000/api/pharmacy/newuser', updatedFormData);
      setError('');
    } catch (err) {
      console.error('Error adding user details:', err);
      setError('Failed to save customer details. Please try again.');
    }
  };

  const handleNewCustomerNext = () => {
    if (!formData.Customer_ID) {
      setError('Please generate a customer ID first.');
      return;
    }
    setShowNewCustomerModal(false);
    setShowPrescriptionModal(true);
    setPrescriptionData(prev => ({ ...prev, customerId: selectedCustomerId }));
    setError('');
  };

  const handleCustomerIdChange = async (e) => {
    const customerId = e.target.value;
    setSelectedCustomerId(customerId);
    try {
      const res = await axios.get(`http://localhost:5000/api/pharmacy/customerId?customerId=${customerId}`);
      const customer = res.data.data;
      if (customer) {
        setSelectedCustomer({
          name: customer.Name,
          contactNumber: customer.Contact_Number
        });
      } else {
        setSelectedCustomer({
          name: '',
          contactNumber: ''
        });
      }
    } catch (err) {
      console.error('Error fetching customer details:', err);
    }
  };

  const handleExistCustomerNext = () => {
    if (!selectedCustomerId) {
      setError('Please enter a valid Customer ID.');
      return;
    }
    setShowExistCustModal(false);
    setShowPrescriptionModal(true);
    setPrescriptionData(prev => ({ ...prev, customerId: selectedCustomerId }));
  };

  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handlePrescriptionModalNext = async () => {
    if (!prescriptionData.customerId || !prescriptionData.doctorName || !prescriptionData.prescriptionDate || !prescriptionData.validityDate) {
      setError('Please fill in all required prescription fields.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/pharmacy/prescription', prescriptionData);
      setSuccess('Prescription details saved successfully!');
      setError('');
      setShowPrescriptionModal(false);
      setShowGenBillButton(true);
    } catch (err) {
      console.error('Error adding prescription details:', err);
      setError('Failed to save prescription details. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleClose = () => {
    setShowConfirmationModal(false);
    setShowModalCustomer(false);
    setShowNewCustomerModal(false);
    setShowExistCustModal(false);
    setShowPrescriptionModal(false);
    setError('');
    setSuccess('');
  };

  return (
    <div>
      <PhNavbar />
      <h2>MEDICINES</h2>
      <button onClick={handleConfirmationModal}>place order</button>
      
      {medicines.map((med) => (
        <MedOrderCard 
          key={med.Medicine_ID}
          medicine={med}
        />
      ))}

      {showConfirmationModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ backgroundColor: 'black', padding: '30px', borderRadius: '8px' }}>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      {item.name} — Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>  
                <button onClick={handleConfirmation}>confirm order</button>
                <button onClick={handleClose}>close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {showModalCustomer && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ backgroundColor: 'black', padding: '30px', borderRadius: '8px' }}>
            <button onClick={handleNewCustomer}>New Customer</button>
            <button onClick={handleExistingCustomer}>Existing Customer</button>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}

      {showNewCustomerModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ backgroundColor: 'black', padding: '30px', borderRadius: '8px' }}>
            <h3>CUSTOMER DETAILS:</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="Name"
                  placeholder="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Customer ID:</label>
                <input
                  type="text"
                  name="Customer_ID"
                  value={formData.Customer_ID}
                  readOnly
                />
              </div>
              <div>
                <label>Contact Number:</label>
                <input
                  type="text"
                  name="Contact_Number"
                  placeholder="Contact Number"
                  value={formData.Contact_Number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Address:</label>
                <input
                  type="text"
                  name="Address"
                  placeholder="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <button onClick={handleNewCustomerEnter}>generate id</button>
                <button onClick={handleNewCustomerNext} disabled={!formData.Customer_ID}>next</button>
                <button onClick={handleClose}>close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showExistCustModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ backgroundColor: 'black', padding: '30px', borderRadius: '8px' }}>
            <h3>CUSTOMER DETAILS:</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
              <div>
                <label>Customer ID:</label>
                <input type="number" onChange={handleCustomerIdChange} />
              </div>
              <div>
                <label>Name:</label>
                <input type="text" value={selectedCustomer.name || ''} readOnly />
              </div>
              <div>
                <label>Contact Number:</label>
                <input type="text" value={selectedCustomer.contactNumber || ''} readOnly />
              </div>
              <div>
                <button onClick={handleExistCustomerNext}>next</button>
                <button onClick={handleClose}>close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPrescriptionModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ backgroundColor: 'black', padding: '30px', borderRadius: '8px' }}>
            <h3>ENTER PRESCRIPTION DETAILS:</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div>
              <div>
                <label>Customer ID:</label>
                <input
                  type="number"
                  name="customerId"
                  value={prescriptionData.customerId}
                  onChange={handlePrescriptionChange}
                  placeholder="Customer ID"
                  required
                />
              </div>
              <div>
                <label>Doctor Name:</label>
                <input
                  type="text"
                  name="doctorName"
                  value={prescriptionData.doctorName}
                  onChange={handlePrescriptionChange}
                  placeholder="Dr Name"
                  required
                />
              </div>
              <div>
                <label>Prescription Date:</label>
                <input
                  type="date"
                  name="prescriptionDate"
                  value={prescriptionData.prescriptionDate}
                  onChange={handlePrescriptionChange}
                  required
                />
              </div>
              <div>
                <label>Validity Date:</label>
                <input
                  type="date"
                  name="validityDate"
                  value={prescriptionData.validityDate}
                  onChange={handlePrescriptionChange}
                  required
                />
              </div>
            </div>
            <div>
              <button onClick={handlePrescriptionModalNext}>next</button>
              <button onClick={handleClose}>close</button>
            </div>
          </div>
        </div>
      )}

      {showGenBillButton && (
              <div
                style={{
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={{ backgroundColor: 'black', padding: '30px', borderRadius: '8px' }}>
                  <button>Generate Bill</button>                 
                </div>
              </div>
            )}
    </div>
  );
};

export default Pharmacy;