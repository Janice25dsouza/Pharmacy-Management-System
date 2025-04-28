import React, {useEffect, useState} from 'react';
import AdNavbar from '../components/AdNavBar';
import NewMedModal from '../components/NewMedModal';
import MedicineCard from '../components/MedicineCard';
import axios from 'axios';

const Update = () => {
  const [medicines,setMedicines] = useState([]);

  const fetchMedicines = async() => {
    try{
      const res = await axios.get('http://localhost:5000/update/get-medicine');
      setMedicines(res.data.data);
    }catch(err){
      console.error('Error fetching medicines:',err);
    }
  };

  useEffect(() =>{
    fetchMedicines();
  },[]);

  const [showModal,setShowModal] = useState(false);
  return(
    <div>
      <AdNavbar />
      <h2>INVENTORY</h2>
      <button onClick={()=> setShowModal(true)}>+</button>
      <NewMedModal isOpen={showModal} onClose={()=>setShowModal(false)} onAdded={fetchMedicines}/>

      {medicines.map((med) => (
        <MedicineCard
          key={med.Medicine_ID}
          medicine={med} onDeleted={fetchMedicines}
        />
      ))}
    </div>
  );
};

export default Update;

//key={med.Medicine_ID}  this is for reacts list rendering... it is just a unique id 
//map function is used to iterate throguh every medicine in the list