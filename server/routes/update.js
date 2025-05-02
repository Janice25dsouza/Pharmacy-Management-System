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

router.patch('/reset/:id',(req,res)=>{
  const Medicine_ID=req.params.id;
  const query = `update medicine_catalog 
                 set Quantity_In_Stock=0
                 where Medicine_ID =?`;
  db.query(query, [Medicine_ID], (err, result) => {
    if (err) {
      console.error('Error resetting medicine quantity:', err);
      return res.status(500).json({ error: 'Failed to reset medicine' });
    }
    res.status(200).json({ message: 'Medicine resetted successfully' });
  });
})


module.exports = router;