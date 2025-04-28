import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Pharmacy from "./pages/Pharmacy";
import Update from "./pages/Update";
import Orders from "./pages/Orders"
import Manufacturer from "./pages/Manufacturer"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/update" element={<Update />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/manufacturer" element={<Manufacturer />} />
      </Routes>
    </Router>
  )
}

export default App