import React, { useEffect, useState } from 'react';

const MedOrderCard = ({ medicine }) => {
  const [quantity, setQuantity] = useState(0);

  // Load quantity from localStorage on component mount or update
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('medicineCart')) || {};
    setQuantity(cart[medicine.Medicine_ID] || 0);
  }, []);

  const updateQuantityFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem('medicineCart')) || {};
    setQuantity(cart[medicine.Medicine_ID] || 0);
  };

  const handleAddToCart = (medicineId) => {
    const existingCart = JSON.parse(localStorage.getItem('medicineCart')) || {};
    existingCart[medicineId] = (existingCart[medicineId] || 0) + 1;
    localStorage.setItem('medicineCart', JSON.stringify(existingCart));
    updateQuantityFromLocalStorage();
  };

  const handleRemove = (medicineId) => {
    const existingCart = JSON.parse(localStorage.getItem('medicineCart')) || {};
    if (existingCart[medicineId] > 1) {
      existingCart[medicineId]--;
    } else {
      delete existingCart[medicineId];
    }
    localStorage.setItem('medicineCart', JSON.stringify(existingCart));
    updateQuantityFromLocalStorage();
  };

  const handleExpiryLow = (expDate,qty,medId) => {
    const today = new Date();
    if(expDate<today){
      alert("Cannot place order!!! Medicine stock has expired");
    } else if(qty==0){
      alert("Cannot place order!!! Medicine out of stock");
    }
    else{
      handleAddToCart(medId);
    };
  }

  return (
    <div className="medicine-card">
      <p><strong>ID:</strong> {medicine.Medicine_ID}</p>
      <p><strong>Name:</strong> {medicine.Medicine_Name}</p>
      <p><strong>Expiry:</strong> {medicine.Expiry_Date}</p>
      <p><strong>Price:</strong> {medicine.Price_Per_Unit}</p>
      <p><strong>Available qty:</strong> {medicine.Quantity_In_Stock}</p>
      <p><strong>Manufacturer ID:</strong> {medicine.Manufacturer_ID}</p>

      <div>
        <button onClick={() => handleExpiryLow(medicine.Expiry_Date,medicine.Quantity_In_Stock,medicine.Medicine_ID)}>Add</button>
        <span style={{ margin: '0 10px' }}><strong>Qty:</strong> {quantity}</span>
        <button onClick={() => handleRemove(medicine.Medicine_ID)}>Remove</button>
      </div>
    </div>
  );
};

export default MedOrderCard;
//<button onClick={() => handleAddToCart(medicine.Medicine_ID)}>Add</button>