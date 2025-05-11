const express = require('express');
const router = express.Router();
const db = require("../db");

//query to fetch pending orders
router.get('/pending',(req,res)=>{
    const query = `
        select s.Sup_Ord_ID,s.Supplier_ID,s.Medicine_ID,m.Medicine_Name,s.Qty_Ordered,s.Order_Date,s.Total_Amount,s.status
        from supplier_order s
        join medicine_catalog m on s.Medicine_ID=m.Medicine_ID
        where s.status='Pending' `;
    db.query(query,(err,result)=>{
        if(err){
            console.error('Error fetching pending orders',err);
            return req.status(500).json({error:'Internal Server Error'});
        }
        res.status(200).json({data:result});
    });
});

//query to fetch medicine list for the modal
router.get('/medicines',(req,res)=>{
    const query = `select Medicine_ID,Medicine_Name from Medicine_Catalog`;
    db.query(query,(err,result)=>{
        if(err){
            console.error('Error fetching machines:',err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ data: result });
    });
});


//query to fetch manufacutere names for modal
router.get('/manufacturers',(req,res) =>{
    const{medicineName} = req.query;
    const query =`
        select m.Manufacturer_ID,m.Name
        from manufacturer m
        join medicine_catalog mc 
        on m.Manufacturer_ID=mc.Manufacturer_ID
        where mc.Medicine_Name=?`;
    //const query = `select Name from Manufacturer where Manufacturer_ID in(select Manufacturer_ID from Medicine_Catalog where Medicine_Name=?)`;
    db.query(query,[medicineName],(err,result)=>{
        if(err){
            console.error('Error fetching manufacturers:',err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ manufacturers: result });
    });
});

//query to fetch medicine id based based on medicine name and manufacturer id for modal
router.get('/medicineid',(req,res)=>{
    const {medicineName,manufacturerId} = req.query;
    const query = `select Medicine_ID from medicine_catalog
                    where Medicine_Name=? 
                    and Manufacturer_ID=?`;
    db.query(query,[medicineName,manufacturerId],(err,result)=>{
        if (err) {
            console.error('Error fetching medicine ID:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          if (result.length === 0) {
            return res.status(404).json({ error: 'Medicine not found' });
          }
          res.status(200).json({ medicineId: result[0].Medicine_ID });
    });
});

//query to add an order ro order table 
router.post('/insert',(req,res)=>{
    const {Supplier_ID,Medicine_ID,Qty_Ordered,Total_Amount,Order_Date, Expiry_Date}= req.body;
    const query =`insert into supplier_order (Supplier_ID,Medicine_ID,Qty_Ordered,         
                  Total_Amount,Order_Date, Expiry_Date) values (?, ?, ?, ?, ?, ?)`;

    db.query(query,[Supplier_ID,Medicine_ID,Qty_Ordered,Total_Amount,Order_Date, Expiry_Date],(err, result)=>{
        if (err) {
            console.error('Error inserting new order:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.status(201).json({ message: 'Order added successfully' });
    });
});

// query to update status as completed
router.patch('/completed/:id/complete',(req,res)=>{
    const orderId = req.params.id;
    const query =`update supplier_order
                  set Status='Completed'
                  where Sup_Ord_Id=?`;
    db.query(query, [orderId], (err, result) => {
    if (err) {
      console.error('Error updating order status:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Order marked as completed' });
  });
});

//query to set status as cancelled 
router.patch('/cancelled/:id/cancel',(req,res)=>{
    const orderId = req.params.id;
    const query = `update supplier_order
                   set Status = 'Cancelled'
                   where Sup_Ord_Id=?`;
    
    db.query(query,[orderId],(err,result) => {
        if(err) {
            console.error('Error updating order status to cancelled:',err);
            return res.status(500).json({error:'Internal server Error'});
        }
        res.status(200).json({ message: 'Order marked as cancelled' });
    });
    
});
router.delete(`/delete`, (req, res) => {
    const { Sup_Ord_Id } = req.body;
    const query = `DELETE FROM supplier_order WHERE Sup_Ord_ID = ?`; // Use Sup_Ord_ID to delete specific order
    db.query(query, [Sup_Ord_Id], (err, result) => {
      if (err) {
        console.error('Error deleting order:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    });
  });

  router.delete(`/deletecompleted`, (req, res) => {
    const query = `DELETE FROM supplier_order WHERE Status = 'Completed'`; 
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error deleting completed order:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Completed orders deleted successfully' });
    });
  });

module.exports = router;