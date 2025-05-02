const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/customerId',(req,res) =>{
    const{customerId} = req.query;
    const query =`
        select Name,Contact_Number
        from Customer
        where Customer_ID=?`;
    db.query(query,[customerId],(err,result)=>{
        if(err){
            console.error('Error fetching customer details:',err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({success:true,data:result[0]});
          
    });
});

module.exports = router;