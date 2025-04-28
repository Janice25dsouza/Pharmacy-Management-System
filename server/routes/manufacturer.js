const express = require('express');
const router =  express.Router();
const db = require("../db");

router.get('/search',(req,res) => {
    const searchTerm = req.query.name;  // Getting the ?name=xxx from URL.... for get requests the data isnt sent in the body so we use re.query.name

    const query = `
        SELECT * FROM manufacturer
        WHERE LOWER(Name) LIKE ?
    `;

    const likeSearchTerm = `%${searchTerm.toLowerCase()}%`;

    db.query(query, [likeSearchTerm], (err, results) => {
        if (err) {
            console.error('Error searching manufacturers:', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true, data: results });
    });
});

router.get('/',(req,res) => {
    const query = 'SELECT * FROM manufacturer';

    db.query(query,(err,results)=>{
        if(err){
            console.error('Manufacturer data error:',err);
            return res.status(500).json({success:false});
        }
        res.json({success:true,data:results});
    });
});

module.exports = router;