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
        <li><Link to="/pharmacy">Dashboard</Link></li>
        <li><Link to="/discount">Discount</Link></li>
      </ul>
    </nav>
  )
}

export default AdNavbar