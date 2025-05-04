// src/components/MedicineCard.jsx
import React from 'react';
import axios from 'axios';
import '../styles/MedicineCard.css';

const MedicineCard = ({ medicine, onDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/update/delete/${medicine.Medicine_ID}`
      );
      onDeleted();
    } catch (err) {
      console.log('Error deleting medicine:', err);
    }
  };

  const handleReset = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/update/reset/${medicine.Medicine_ID}`
      );
      onDeleted();
    } catch (err) {
      console.log('Error resetting medicine quantity:', err);
    }
  };

  return (
    <div className="medicine-card">
      <p><strong>ID:</strong> {medicine.Medicine_ID}</p>
      <p><strong>Name:</strong> {medicine.Medicine_Name}</p>
      <p><strong>Expiry:</strong> {medicine.Expiry_Date}</p>
      <p><strong>Price:</strong> {medicine.Price_Per_Unit}</p>
      <p><strong>Quantity:</strong> {medicine.Quantity_In_Stock}</p>
      <p><strong>Manufacturer ID:</strong> {medicine.Manufacturer_ID}</p>
      <div className="button-group">
        <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
        <button className="btn reset-btn" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default MedicineCard;
