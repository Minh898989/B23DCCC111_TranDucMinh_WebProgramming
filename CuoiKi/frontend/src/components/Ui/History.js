import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/History.css';

const OrderHistoryModal = ({ isOpen, onClose }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0); // Track current order

  // Fetch order history when the modal is open
  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!isOpen) return;

      setLoading(true);

      try {
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');

        if (!token || !user_id) {
          alert('Please log in to view your order history.');
          setOrderHistory([]); // Clear order history if not logged in
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/orders/${user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setOrderHistory(response.data.orders);
        } else {
          throw new Error('Error loading order history.');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [isOpen]);

  // Handle previous order navigation
  const handlePrevOrder = () => {
    if (currentOrderIndex > 0) {
      setCurrentOrderIndex(currentOrderIndex - 1);
    }
  };

  // Handle next order navigation
  const handleNextOrder = () => {
    if (currentOrderIndex < orderHistory.length - 1) {
      setCurrentOrderIndex(currentOrderIndex + 1);
    }
  };

  if (!isOpen) return null;

  const currentOrder = orderHistory[currentOrderIndex];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Order History</h2>
          <button onClick={onClose} className="close-button">❌</button>
        </div>
        <div className="modal-body">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : orderHistory.length > 0 ? (
            <div>
              <div className="order-navigation">
                <button onClick={handlePrevOrder} disabled={currentOrderIndex === 0}>
                  Previous Order
                </button>
                <button onClick={handleNextOrder} disabled={currentOrderIndex === orderHistory.length - 1}>
                  Next Order
                </button>
              </div>
              <div className="order-details">
                <p><strong>Recipient Name:</strong> {currentOrder.receiver_name}</p>
                <p><strong>Phone Number:</strong> {currentOrder.phone_number}</p>
                <p><strong>Location:</strong> {currentOrder.location}</p>
                <p><strong>Order Date:</strong> {new Date(currentOrder.created_at).toLocaleString()}</p>
                <p><strong>Total Amount:</strong> {parseFloat(currentOrder.total).toLocaleString()} VNĐ</p>
                <p><strong>Items Count:</strong> {currentOrder.purchase_count}</p>
                <button className="download-invoice-button">Download Invoice</button>
              </div>
              <div className="order-items">
                <h4>Purchased Products:</h4>
                <ul>
                  {currentOrder.items.map((item, index) => (
                    <li key={index} className="item-details">
                      <img src={item.image_url} alt={item.name} className="item-image" />
                      <p><strong>Name:</strong> {item.name}</p>
                      <p><strong>Quantity:</strong> {item.soluong}</p>
                      <p><strong>Price:</strong> {parseFloat(item.price).toLocaleString()} VNĐ</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>You don't have any order history yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryModal;
