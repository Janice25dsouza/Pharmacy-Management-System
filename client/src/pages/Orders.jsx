import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderModal from '../components/OrderModal'; 
import AdNavBar from '../components/AdNavBar';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //this one is for pending orders ie status='pending'?
  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders/pending');
      setOrders(res.data.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  // list of medicines from medicine catalog for the dropdown
  const fetchMedicines = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders/medicines');
      setMedicines(res.data.data);
    } catch (err) {
      console.error('Error fetching medicines:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchMedicines();
  }, []);

  // query to mark order as completed
  const completeOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/completed/${orderId}/complete`);
      fetchOrders(); // Refresh orders after completion
    } catch (err) {
      console.error('Error completing order:', err);
    }
  };

  //query to set order as cancelled and delete it
  const cancelOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/cancelled/${orderId}/cancel`);
      await axios.delete('http://localhost:5000/api/orders/delete', {
        data: { Sup_Ord_Id: orderId } // Pass the Sup_Ord_ID for deletion
      });
      fetchOrders(); // Refresh orders
    } catch (err) {
      console.error('Error cancelling or deleting order:', err);
    }
  };

  return (
    <div>
      <AdNavBar />
      <h2>Supplier Orders</h2>
      <button onClick={() => setShowModal(true)}>Add New Order</button>

      <OrderModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        medicines={medicines}
        onOrderAdded={fetchOrders}
      />

      <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Supplier ID</th>
            <th>Medicine ID</th>
            <th>Medicine Name</th>
            <th>Quantity Ordered</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.Sup_Ord_ID}>
              <td>{order.Sup_Ord_ID}</td>
              <td>{order.Supplier_ID}</td>
              <td>{order.Medicine_ID}</td>
              <td>{order.Medicine_Name}</td>
              <td>{order.Qty_Ordered}</td>
              <td>{order.Order_Date}</td>
              <td>{order.Total_Amount}</td>
              
              <td>    
                  <button onClick={() => completeOrder(order.Sup_Ord_ID)}>Mark as Completed</button>
              </td>
              <td>
                  <button onClick={() => cancelOrder(order.Sup_Ord_ID)}>Cancel Order</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
