const express = require('express');
const router = express.Router();
const db = require("../db");

router.post('/',(req,res) => {
    const { username } = req.body;

    const query = 'SELECT * FROM employee WHERE Employee_ID = ?';
    db.query(query,[username],(err,result) => {
        if(err){
            console.error('Database error:',err);
            return res.status(500).json({success:false});
        }
        if (result.length > 0) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    });
});

module.exports = router;

//500 stands for server error
