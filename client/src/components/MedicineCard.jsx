import React from 'react';
import axios from 'axios';

const MedicineCard = ({medicine,onDeleted}) => {
    

  const handleDelete = async() =>{
    try{
        await axios.delete(`http://localhost:5000/update/delete/${medicine.Medicine_ID}`);
        onDeleted();
    }catch(err){
        console.log('Error deleting medicine:',err);
    }
  };


  
    
  return (
    <div className="medicine-card">
      
          <p><strong>ID:</strong> {medicine.Medicine_ID}</p>
          <p><strong>Name:</strong> {medicine.Medicine_Name}</p>
          <p><strong>Expiry:</strong> {medicine.Expiry_Date}</p>
          <p><strong>Price:</strong>{medicine.Price_Per_Unit}</p>
          <p><strong>Quantity:</strong> {medicine.Quantity_In_Stock}</p>
          <p><strong>Manufacturer ID:</strong> {medicine.Manufacturer_ID}</p>

          <button onClick={handleDelete}>Delete</button>
        
        
      
    </div>
  );
};

export default MedicineCard