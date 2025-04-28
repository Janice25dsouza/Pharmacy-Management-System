const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/low-stock',(req,res) => {
    const query = 'select Medicine_ID,Medicine_Name,Quantity_In_Stock from Medicine_Catalog where Quantity_In_Stock<10';

    db.query(query,(err,results) => {
        if(err){
            console.error('DB error (low-stock):',err);
            return res.status(500).json({success:false});
        }
        res.json({success:true,data:results});
    });
});

router.get('/expired',(req,res) => {
    const query = 'select Medicine_ID,Medicine_Name,Expiry_Date from Medicine_Catalog where Expiry_Date<now()';
    db.query(query,(err,results) => {
        if(err) {
            console.error('DB error (expired)',err);
            return res.status(500).json({success:false});
        }
        res.json({success:true,data:results});
    });
});

module.exports = router;