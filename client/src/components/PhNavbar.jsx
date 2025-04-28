import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/AdNavbar.css';

const AdNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">PharmacySys</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Logout</Link></li>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/update">Update</Link></li>
        <li><Link to="/orders">Orders</Link></li>
      </ul>
    </nav>
  )
}

export default AdNavbar