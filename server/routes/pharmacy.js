const express = require('express');
const router = express.Router();
const db = require('../db');

// Generate new Customer ID
router.get('/newuserid', (req, res) => {
  const query = `
    SELECT Customer_ID
    FROM Customer
    ORDER BY Customer_ID DESC
    LIMIT 1
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching customer id:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ success: true, data: result[0] || { Customer_ID: 0 } });
  });
});

// Fetch existing customer by ID
router.get('/customerId', (req, res) => {
  const { customerId } = req.query;
  const query = `
    SELECT Name, Contact_Number
    FROM Customer
    WHERE Customer_ID = ?
  `;
  db.query(query, [customerId], (err, result) => {
    if (err) {
      console.error('Error fetching customer details:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ success: true, data: result[0] || null });
  });
});

// Add new customer
router.post('/newuser', (req, res) => {
  const { Customer_ID, Name, Contact_Number, Address } = req.body;
  const query = `
    INSERT INTO Customer (Customer_ID, Name, Contact_Number, Address)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [Customer_ID, Name, Contact_Number, Address], (err, result) => {
    if (err) {
      console.error('Error inserting new customer details:', err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json({ success: true, message: 'Customer added successfully!' });
  });
});

// Insert prescription details
router.post('/prescription', (req, res) => {
  const { customerId, doctorName, prescriptionDate, validityDate } = req.body;
  const query = `
    INSERT INTO Prescription (Customer_ID, Doctor_Name, Prescription_Date, Validity_Date)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [customerId, doctorName, prescriptionDate, validityDate], (err, result) => {
    if (err) {
      console.error('Error inserting prescription details:', err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json({ success: true, message: 'Prescription details added successfully!' });
  });
});

// Generate new Order ID
router.get('/neworderid', (req, res) => {
  const query = `
    SELECT Order_ID
    FROM customer_order
    ORDER BY Order_ID DESC
    LIMIT 1
  `;
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching last order id:', err);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    res.json({ success: true, data: result[0] || { Order_ID: 0 } });
  });
});

// Gent price per unit
router.get('/price', (req, res) => {
    const {name: medicineId} = req.query;
    const query = `
      SELECT Price_Per_Unit
      FROM medicine_catalog
      where Medicine_ID=?
    `;
    db.query(query,[medicineId],(err, result) => {
      if (err) {
        console.error('Error fetching last order id:', err);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
      res.json({ success: true, data: result[0]});
    });
  });

// Insert order items
router.post('/order', (req, res) => {
  const { Order_ID, Customer_ID, Order_Date, Medicine_ID, Med_Quantity, Total_Amount } = req.body;
  const query = `
    INSERT INTO customer_order (Order_ID, Customer_ID, Order_Date, Medicine_ID, Med_Quantity, Total_Amount)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [Order_ID, Customer_ID, Order_Date, Medicine_ID, Med_Quantity, Total_Amount],
    (err, result) => {
      if (err) {
        console.error('Error inserting order details:', err);
        return res.status(500).json({ success: false, error: err });
      }
      res.json({ success: true, message: 'Order item added successfully!' });
    }
  );
});

router.get('/bill', (req, res) => {
    const orderId = req.query.orderId;
    const query = `
      SELECT Order_Date, Medicine_ID, Med_Quantity, Total_Amount
      FROM customer_order
      WHERE Order_ID = ?
    `;
    db.query(query, [orderId], (err, result) => {
      if (err) return res.status(500).json({ success:false });
      res.json({ success:true, data: result });
    });
  });

router.get('/discounts', (req, res) => {
    db.query('SELECT Amount, Percentage FROM discount ', (err, rows) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true, data: rows });
    });
});

module.exports = router;
