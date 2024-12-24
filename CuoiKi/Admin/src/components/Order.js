import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/orders')
      .then((response) => {
        if (Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);
        } else {
          setOrders([response.data.orders]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Lỗi khi lấy dữ liệu');
        setLoading(false);
      });
  }, []);

  // Hiển thị trạng thái loading hoặc lỗi
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Hàm định dạng tiền tệ
  const formatCurrency = (price) => {
    if (price && !isNaN(price) && price !== null) {
      return Number(price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'VND', 
      });
    }
    return 'N/A';
  };

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Hàm hiển thị chi tiết hóa đơn
  const handleShowOrderDetails = (order) => {
    setSelectedOrder(order); // Set selected order to show details
  };

  return (
    <div className="orders-page">
      <h2>Danh sách Hóa Đơn</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Người Nhận</th>
            <th>Số Điện Thoại</th>
            <th>Địa Chỉ</th>
            <th>Tổng Tiền</th>
            <th>Ngày Tạo</th>
            <th>Số Lần Mua</th>
            <th>Chi Tiết</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.receiver_name}</td>
                <td>{order.phone_number}</td>
                <td>{order.location}</td>
                <td>{formatCurrency(order.total)}</td>
                <td>{formatDate(order.created_at)}</td>
                <td>{order.purchase_count}</td>
                <td>
                  <button onClick={() => handleShowOrderDetails(order)}>Xem Chi Tiết</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Không có hóa đơn nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for order details */}
      {selectedOrder && (
        <div className="order-details-modal">
          <h3>Chi Tiết Hóa Đơn</h3>
          <p><strong>Người nhận:</strong> {selectedOrder.receiver_name}</p>
          <p><strong>Số điện thoại:</strong> {selectedOrder.phone_number}</p>
          <p><strong>Địa chỉ:</strong> {selectedOrder.location}</p>
          <h4>Danh sách sản phẩm đã mua:</h4>
          <ul>
            {/* Ensure items is defined and is an array */}
            {selectedOrder.items && Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 ? (
              selectedOrder.items.map((item, index) => (
                <li key={index}>
                <img src={item.image_url} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                {item.name} - Số lượng: {item.soluong} - Giá: {item.price} VND
              </li>
              

              ))
            ) : (
              <li>Không có sản phẩm nào trong hóa đơn này.</li>
            )}
          </ul>
          <button onClick={() => setSelectedOrder(null)}>Đóng</button>
        </div>
      )}
    </div>
  );
};

export default Orders;
