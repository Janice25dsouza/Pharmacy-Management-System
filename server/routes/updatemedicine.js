const express = require('express');
const router =  express.Router();
const db = require("../db");

router.put('/:id', (req, res) => {
    const medId = req.params.id;
    const {
      Medicine_ID,
      Medicine_Name,
      Price_Per_Unit,
      Expiry_Date,
      Quantity_In_Stock,
      Manufacturer_ID
    } = req.body;
  
    const query = `
      UPDATE medicine_catalog 
      SET Medicine_ID = ?, Medicine_Name = ?, Price_Per_Unit = ?, Expiry_Date = ?, 
          Quantity_In_Stock = ?, Manufacturer_ID = ?
      WHERE Medicine_ID = ?
    `;
  
    db.query(query, [Medicine_ID,Medicine_Name, Price_Per_Unit, Expiry_Date, Quantity_In_Stock, Manufacturer_ID,Medicine_ID], (err, result) => {
      if (err) {
        console.error('Error updating medicine:', err);
        return res.status(500).json({ error: 'Failed to update medicine' });
      }
      res.status(200).json({ message: 'Medicine updated successfully' });
    });
  });

module.exports = router;