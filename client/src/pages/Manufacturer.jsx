import React,{useState,useEffect} from 'react';
import AdNavbar from '../components/AdNavbar';
import axios from 'axios';

const Manufacturer = () => {

    const[supplierDetails, setSupplierDetails]=useState([]);//for the table details

    const[searchTerm,setSearchTerm] = useState('');
    const[selectedManufacturer,setSelectedManufacturer] = useState('');
    const[showModal,setShowModal] = useState(false);

    useEffect(()=>{
        const fetchData = async() => {
            try{
                const manuDet = await axios.get('http://localhost:5000/api/manufacturer');
                setSupplierDetails(manuDet.data.data);
            } catch(error){
                console.error('Error fetching data:',error);
            }
        };

        fetchData();
    },[]);

    const handleSearch = async() => {
        try {
            const response = await axios.get(`http://localhost:5000/api/manufacturer/search?name=${searchTerm}`);
            if (response.data.data.length > 0) {
              setSelectedManufacturer(response.data.data[0]); //  can also show multiple matches too ig 
              setShowModal(true);
            } else {
              alert('Manufacturer not found!');
            }
          } catch (error) {
            console.error('Error searching manufacturer:', error);
          }
    };

    const closeModal = () => { 
        setShowModal(false);
        setSelectedManufacturer(null);
      };

    return (
        <div>
            <AdNavbar />
            <div>
                <h2>MANUFACTURER DETAILS</h2>

                <div>
                    <input
                        type="text"
                        placeholder="Enter Manufacturer Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                <div>
                    <table border="1" cellPadding={"10"}>
                    <thead>
                        <tr>
                        <th>Manufacture ID</th>
                        <th>Manufacturer</th>
                        <th>Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplierDetails.map((md,idx) => (
                        <tr key={idx}>
                            <td>{md.Manufacturer_ID}</td>
                            <td>{md.Name}</td>
                            <td>{md.Contact_Number}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                {showModal && selectedManufacturer && (
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
                            <h3>Manufacturer Details</h3>
                            <p><strong>ID:</strong> {selectedManufacturer.Manufacturer_ID}</p>
                            <p><strong>Name:</strong> {selectedManufacturer.Name}</p>
                            <p><strong>Contact Number:</strong> {selectedManufacturer.Contact_Number}</p>

                            <button onClick={closeModal} style={{ marginTop: '20px', padding: '8px 16px' }}>
                            Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Manufacturer;