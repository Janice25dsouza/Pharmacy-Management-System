import React, {useState, useEffect} from 'react';
import AdNavbar from '../components/AdNavbar';
import axios from 'axios';

const Admin = () => {
  const [lowStock, setLowStock] = useState([]);
  const [expired, setExpired] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lowRes = await axios.get('http://localhost:5000/api/adminmedicines/low-stock');
        const expRes = await axios.get('http://localhost:5000/api/adminmedicines/expired');

        setLowStock(lowRes.data.data);
        setExpired(expRes.data.data);
      } catch(error){
        console.error('Error fetching data:',error);
      }
    };

    fetchData();
  },[]);

  return (
    <div>
      <AdNavbar />
      <div style={{padding:'2rem'}}>
        <h2>TO BE RESTOCKED SOON</h2>
        <table border="1" cellPadding={"10"}>
          <thead>
            <tr>
              <th>Medicine ID</th>
              <th>Medicine Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.map((med,idx) => (
              <tr key={idx}>
                <td>{med.Medicine_ID}</td>
                <td>{med.Medicine_Name}</td>
                <td>{med.Quantity_In_Stock}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>EXPIRED MEDICINES</h2>
        <table border="1" cellPadding={"10"}>
          <thead>
            <tr>
              <th>Medicine ID</th>
              <th>Medicine Name</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {expired.map((med,idx) => (
              <tr key={idx}>
                <td>{med.Medicine_ID}</td>
                <td>{med.Medicine_Name}</td>
                <td>{new Date(med.Expiry_Date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin