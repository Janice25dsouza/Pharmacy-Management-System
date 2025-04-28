const express = require('express');
const router =  express.Router();
const db = require("../db");

router.get('/get-medicine',(req,res) => {
  const query='SELECT * FROM medicine_catalog';

  db.query(query,(err,result) => {
    if(err){
      console.error('Error fetching medicines:',err);
      return res.status(500).json({error:'Internal Server Error'});
    }
    res.status(200).json({data:result});
  });
});

router.delete('/delete/:id', (req, res) => {
  const Medicine_ID = req.params.id;
  const query = `DELETE FROM medicine_catalog WHERE Medicine_ID = ?`;

  db.query(query, [Medicine_ID], (err, result) => {
    if (err) {
      console.error('Error deleting medicine:', err);
      return res.status(500).json({ error: 'Failed to delete medicine' });
    }
    res.status(200).json({ message: 'Medicine deleted successfully' });
  });
});


module.exports = router;