import React,{useEffect,useState} from 'react';
import PhNavbar from '../components/PhNavbar';
import MedOrderCard from '../components/MedOrderCard';
import axios from 'axios';

const Pharmacy = () => {
  
  const [medicines,setMedicines] = useState([]);
  
  
  
  
  //for prescription
  //const [showPrescriptionModal,setShowPrescriptionModal]=useState(false);
  //for bill generation

  const fetchMedicines = async() => {
    try{
      const res = await axios.get('http://localhost:5000/update/get-medicine');
      setMedicines(res.data.data);
    }catch(err){
      console.error('Error fetching medicines:',err);
    }
  };

  useEffect(()=>{
    fetchMedicines();
  },[]);

  

  //for confirm modal
  const[showConfirmationModal,setShowConfirmationModal]=useState(false);
  const [cartItems,setCartItems]=useState([]);

  const handleConfirmationModal = () =>{
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
  }

  //for customer modal with buttons: new and existing
  const [showModalCustomer,setShowModalCustomer]=useState(false);
  
  const handleConfirmation = () => {
    setShowConfirmationModal(false);
    setShowModalCustomer(true);
  }

  //for new customer
  const [showNewCustomerModal,setShowNewCustomerModal]=useState(false);
  const [formData,setFormData] = useState({
    Name:'',
    Contact_Number:'',
    Address:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }
  const handleNewCustomer = () => {
    setShowModalCustomer(false);
    setShowNewCustomerModal(true);
  }
  
  const handleExistingCustomer = () => {
    setShowModalCustomer(false);
    setShowExistCustModal(true);
  }

  //for existing customer modal
  const [showExistCustModal,setShowExistCustModal]=useState(false);
  const [selectedCustomerId,setSelectedCustomerId]=useState('');
  const [selectedCustomer,setSelectedCustomer]=useState({
    name: '',
    contactNumber:''
  });

  const handleCustomerIdChange = async(e) => {
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

  const handleClose = () =>{
    setShowConfirmationModal(false);
    setShowModalCustomer(false);
    setShowNewCustomerModal(false);
    setShowExistCustModal(false);
  }

  return (
    <div>
      <PhNavbar />
      <h2>MEDICINES</h2>

      <button onClick={()=>handleConfirmationModal()}>place order</button>
      
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
              
              {cartItems.length === 0?(
                <p>Your cart is empty.</p>
              ):(
                <div>
                  <ul>
                    {cartItems.map((item, index) => (
                      <li key={index}>
                        {item.name} — Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>  
                  <button onClick={()=>handleConfirmation()}>confirm order</button>
                  <button onClickCapture={()=>handleClose()}>close</button>
                </div>
              )
            }
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
              <button onClick={()=>handleNewCustomer()}>New Customer</button>
              <button onClick={()=>handleExistingCustomer()}>Existing Customer</button>
              <button onClick={()=>handleClose()}>Close</button>
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
              <div>
                <div>
                  <label>Name:</label>
                  <input type="text" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} required/>
                </div>
                <div>
                  <label>Contact Number:</label>
                  <input type="text" name="Contact_Number" placeholder="Contact Number" value={formData.Contact_Number} onChange={handleChange} required/> 
                </div>
                <div>
                  <label>Address:</label>
                  <input type="text" name="Address" placeholder="Address" value={formData.Address} onChange={handleChange} required/>
                </div> 
              </div>
          
                <div>
                  <button>next</button>
                  <button onClick={()=>handleClose()}>close</button>
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
              <div>
                <div>
                  <label>Customer ID:</label>
                  <input type="number" onChange={handleCustomerIdChange}/>
                </div>
                <div>
                  <label>Name:</label>
                  <input type="text" value={selectedCustomer.name || ''} readOnly/>
                </div>
                <div>
                  <label>Contact Number:</label>
                  <input type="text" value={selectedCustomer.contactNumber || ''} readOnly/>
                </div>
                
              </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Pharmacy;

/*
  1 for submitting user details refer nemedmodal.jsx component
      

      

      {showPrescriptionModal && (
        <div>prescription modal</div>
      )}*/