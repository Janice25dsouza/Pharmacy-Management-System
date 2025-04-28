import React,{useState} from 'react';
import axios from 'axios';
import '../styles/NewMedModal.css';

const NewMedModal = ({isOpen,onClose,onAdded}) => {
    const [formData,setFormData] = useState({
        Medicine_ID:'',
        Medicine_Name:'',
        Price_Per_Unit:'',
        Expiry_Date:'',
        Quantity_In_Stock:'',
        Manufacturer_ID:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value })); // prev basically copies the previously entered values and [name]:value simply updates the newly entered/types valus by the user
    };

    const handleSubmit = async () => {
        try {
          await axios.post('http://localhost:5000/api/newmed', formData);
          onAdded(); 
          onClose(); 
        } catch (err) {
          console.error('Error adding medicine:', err);
        }
      };

    if(!isOpen) return null;
    
    return(
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Add New Medicine</h2>

                <input type="number" name="Medicine_ID" placeholder="Medicine ID" value={formData.Medicine_ID} onChange={handleChange} />
                <input type="text" name="Medicine_Name" placeholder="Medicine Name" value={formData.Medicine_Name} onChange={handleChange}/>
                <input type="number" name="Price_Per_Unit" placeholder="Price per unit" value={formData.Price_Per_Unit} onChange={handleChange} />
                <input type="date" name="Expiry_Date" placeholder="Expiry Date" value={formData.Expiry_Date} onChange={handleChange} />
                <input type="number" name="Quantity_In_Stock" placeholder="Quantity_In_Stock" value={formData.Quantity_In_Stock} onChange={handleChange} />
                <input type="number" name="Manufacturer_ID" placeholder="Manufacturer_ID" value={formData.Manufacturer_ID} onChange={handleChange} />

                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Add</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NewMedModal;