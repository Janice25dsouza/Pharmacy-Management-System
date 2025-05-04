const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/newuserid', (req, res) => {
    const query = `SELECT Customer_ID
                   FROM Customer
                   ORDER BY Customer_ID DESC
                   LIMIT 1`;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching customer id:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ success: true, data: result[0] });
    });
});

router.get('/customerId', (req, res) => {
    const { customerId } = req.query;
    const query = `
        SELECT Name, Contact_Number
        FROM Customer
        WHERE Customer_ID = ?`;
    db.query(query, [customerId], (err, result) => {
        if (err) {
            console.error('Error fetching customer details:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ success: true, data: result[0] });
    });
});

router.post('/newuser', (req, res) => {
    const { Customer_ID, Name, Contact_Number, Address } = req.body;

    const query = `INSERT INTO Customer (Customer_ID, Name, Contact_Number, Address) VALUES (?, ?, ?, ?)`;

    db.query(query, [Customer_ID, Name, Contact_Number, Address], (err, result) => {
        if (err) {
            console.error('Error inserting new customer details:', err);
            return res.status(500).json({ success: false, error: err });
        }
        res.json({ success: true, message: 'Customer added successfully!' });
    });
});

router.post('/prescription', (req, res) => {
    const { customerId, doctorName, prescriptionDate, validityDate } = req.body;

    const query = `INSERT INTO Prescription (Customer_ID, Doctor_Name, Prescription_Date, Validity_Date) VALUES (?, ?, ?, ?)`;

    db.query(query, [customerId, doctorName, prescriptionDate, validityDate], (err, result) => {
        if (err) {
            console.error('Error inserting prescription details:', err);
            return res.status(500).json({ success: false, error: err });
        }
        res.json({ success: true, message: 'Prescription details added successfully!' });
    });
});

module.exports = router;