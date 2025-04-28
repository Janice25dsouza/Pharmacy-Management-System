import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();

    try{
        const response = await axios.post('http://localhost:5000/api/login',{ username }); //await is used to tell the js to wait for the server to respond before movin on

        if(response.data.exists){
            if(username.startsWith('ad')) {
                navigate('/admin');
            } else if (username.startsWith('ph')) {
                navigate('/pharmacy');
            } 
        } else {
            alert('Invalid username. Please try again.');
        }
    } catch (err) {
        console.error(err);
        alert('Server error. Please try again later');
    }
  };

  return(
    <div>
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Enter your ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    </div>
   );
};



export default Login