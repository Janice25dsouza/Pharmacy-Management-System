const express = require('express');
const router =  express.Router();
const db = require("../db");

router.post('/', (req, res) => {
    const { Medicine_ID, Medicine_Name, Price_Per_Unit, Expiry_Date, Quantity_In_Stock, Manufacturer_ID } = req.body;
  
    const query = `
      INSERT INTO medicine_catalog (Medicine_ID, Medicine_Name, Price_Per_Unit, Expiry_Date, Quantity_In_Stock, Manufacturer_ID)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    db.query(query, [Medicine_ID, Medicine_Name, Price_Per_Unit, Expiry_Date, Quantity_In_Stock, Manufacturer_ID], (err, result) => {
      if (err) {
        console.error('Error inserting medicine:', err);
        return res.status(500).json({ success: false, error: err });
      }
      res.json({ success: true, message: 'Medicine added successfully!' });
    });
});

module.exports = router;