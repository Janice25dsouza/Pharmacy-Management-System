import React, { useState } from 'react';
import axios from 'axios';

const OrderModal = ({ isOpen, onClose, medicines, onOrderAdded }) => {
  const [selectedMedicineName, setSelectedMedicineName] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturerId, setSelectedManufacturerId] = useState('');
  const [medicineId, setMedicineId] = useState('');
  const [quantityOrdered, setQuantityOrdered] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  if (!isOpen) return null;

  // Handle change in medicine selection
  const handleMedicineChange = async (e) => {
    const medName = e.target.value;
    setSelectedMedicineName(medName);
    setSelectedManufacturerId('');
    setMedicineId('');  // Reset the medicine ID on new selection

    try {
      const res = await axios.get(`http://localhost:5000/api/orders/manufacturers?medicineName=${medName}`);
      setManufacturers(res.data.manufacturers); // Set available manufacturers
    } catch (err) {
      console.error('Error fetching manufacturers:', err);
    }
  };

  // Handle manufacturer selection change
  const handleManufacturerChange = async (e) => {
    const manufId = e.target.value;
    setSelectedManufacturerId(manufId);

    try {
      const res = await axios.get(`http://localhost:5000/api/orders/medicineId?medicineName=${selectedMedicineName}&manufacturerId=${manufId}`);
      setMedicineId(res.data.medicineId); // Fetch medicine ID
    } catch (err) {
      console.error('Error fetching medicine ID:', err);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/orders/insert', {
        Supplier_ID: selectedManufacturerId,
        Medicine_ID: medicineId,
        Qty_Ordered: quantityOrdered,
        Total_Amount: totalAmount,
        Order_Date: orderDate,
        Expiry_Date: expiryDate,
      });
      onOrderAdded();  // Notify parent to update orders
      onClose();        // Close the modal
    } catch (err) {
      console.error('Error adding order:', err);
    }
  };

  return (
    <div className="modal" style={{ position: 'fixed', top: '100px', left: '30%', background: 'black', padding: '20px', border: '1px solid black', zIndex: 999, marginTop: '200px', marginLeft: '100px' }}>
      <h3>Add New Order</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Medicine Name:</label>
          <select value={selectedMedicineName} onChange={handleMedicineChange} required>
            <option value="">Select Medicine</option>
            {[...new Set(medicines.map(med => med.Medicine_Name))].map((name, idx) => (
              <option key={idx} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        
        <div>
            <label>Manufacturer:</label>
            <select value={selectedManufacturerId} onChange={handleManufacturerChange} required>
              <option value="">Select Manufacturer</option>
              {manufacturers.map((manu, idx) => (
                <option key={idx} value={manu.Manufacturer_ID}>
                  {manu.Name}
                </option>
              ))}
            </select>
        </div>
        
        <div>
            <label>Medicine ID:</label>
            <input type="text" value={medicineId} readOnly />
        </div>

        <div>
          <label>Quantity Ordered:</label>
          <input type="number" value={quantityOrdered} onChange={(e) => setQuantityOrdered(e.target.value)} required />
        </div>

        <div>
          <label>Total Amount:</label>
          <input type="number" step="0.01" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} required />
        </div>

        <div>
          <label>Order Date:</label>
          <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
        </div>

        <div>
          <label>Expiry Date:</label>
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
        </div>

        <div style={{ marginTop: '10px' }}>
          <button type="submit">Add Order</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default OrderModal;
