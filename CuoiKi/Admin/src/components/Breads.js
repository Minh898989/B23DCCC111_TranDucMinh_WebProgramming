import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles.css';

const Breads = () => {
  const [breads, setBreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newBread, setNewBread] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    entry_date: '',
    expiry_date: '',
    quantity: '',
    supplier: ''
  });
  const [editing, setEditing] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch data from API
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/breads')
      .then((response) => {
        setBreads(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Edit bread
  const onEdit = (bread) => {
    setEditing(bread.id);
    setNewBread({
      name: bread.name,
      price: bread.price,
      description: bread.description,
      image_url: bread.image_url,
      entry_date: bread.entry_date,
      expiry_date: bread.expiry_date,
      quantity: bread.quantity,
      supplier: bread.supplier
    });
    setModalVisible(true);
  };

  // Update bread
  const handleUpdate = () => {
    axios
      .put(`http://localhost:5000/api/breads/${editing}`, {
        ...newBread,
        entry_date: formatDate(newBread.entry_date),
        expiry_date: formatDate(newBread.expiry_date),
      })
      .then((response) => {
        console.log('API response (update):', response.data);
  
        // After updating, fetch the updated list of breads
        axios
          .get('http://localhost:5000/api/breads')
          .then((getResponse) => {
            setBreads(getResponse.data); // Update the bread list with the new data
            setModalVisible(false); // Close the modal
            resetForm(); // Reset the form fields
          })
          .catch((error) => {
            console.error('Error fetching updated bread list:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating bread:', error);
      });
  };
  

  // Delete bread
  const onDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/breads/${id}`)
      .then(() => {
        setBreads(breads.filter((bread) => bread.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting bread:', error);
      });
  };

  // Add new bread
  const onAdd = () => {
    console.log(newBread);
    axios
      .post('http://localhost:5000/api/breads', newBread) // Add new bread
      .then((response) => {
        console.log('API response (add):', response.data);
        
        // Fetch the updated bread list after adding the new bread
        axios
          .get('http://localhost:5000/api/breads')
          .then((getResponse) => {
            setBreads(getResponse.data); // Update the bread list with the new data
            setModalVisible(false); // Close the modal
            resetForm(); // Reset the form fields
          })
          .catch((error) => {
            console.error('Error fetching updated bread list:', error);
          });
      })
      .catch((error) => {
        console.error('Error adding bread:', error);
      });
  };
  const formatCurrency = (price) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'VND', // Thay đổi đơn vị tiền tệ nếu cần
      // Loại bỏ phần thập phân nếu không cần
    });
  };
  

  // Date formatting function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format as yyyy-MM-dd
  };

  // Reset form
  const resetForm = () => {
    setNewBread({
      name: '',
      price: '',
      description: '',
      image_url: '',
      entry_date: '',
      expiry_date: '',
      quantity: '',
      supplier: ''
    });
    setEditing(null);
  };

  return (
    <div className="management-pagee">
      <h2>Trang Quản lý Bánh mì</h2>

      {/* Modal Form for Add/Edit Bread */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editing ? 'Sửa Bánh mì' : 'Thêm Bánh mì'}</h3>
            <form>
              <input
                type="text"
                placeholder="Tên Bánh mì"
                value={newBread.name}
                onChange={(e) => setNewBread({ ...newBread, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Giá"
                value={newBread.price}
                onChange={(e) => setNewBread({ ...newBread, price: e.target.value })}
              />
              <input
                type="text"
                placeholder="Miêu tả"
                value={newBread.description}
                onChange={(e) => setNewBread({ ...newBread, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Ảnh"
                value={newBread.image_url}
                onChange={(e) => setNewBread({ ...newBread, image_url: e.target.value })}
              />
              <input
                type="date"
                placeholder="Ngày Nhập"
                value={newBread.entry_date ? formatDate(newBread.entry_date) : ''}
                onChange={(e) => setNewBread({ ...newBread, entry_date: e.target.value })}
              />
              <input
                type="date"
                placeholder="Ngày Hết Hạn"
                value={newBread.expiry_date ? formatDate(newBread.expiry_date) : ''}
                onChange={(e) => setNewBread({ ...newBread, expiry_date: e.target.value })}
              />
              <input
                type="number"
                placeholder="Số Lượng"
                value={newBread.quantity}
                onChange={(e) => setNewBread({ ...newBread, quantity: e.target.value })}
              />
              <input
                type="text"
                placeholder="Cung Cấp"
                value={newBread.supplier}
                onChange={(e) => setNewBread({ ...newBread, supplier: e.target.value })}
              />

              <button
                type="button"
                onClick={editing ? handleUpdate : onAdd}
                style={{ marginTop: '10px', backgroundColor: '#2ecc71' }}
              >
                {editing ? 'Cập nhật' : 'Thêm'}
              </button>
              <button
                type="button"
                onClick={() => setModalVisible(false)} // Close modal
                style={{ marginTop: '10px', backgroundColor: '#e74c3c' }}
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bread List Table */}
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Bánh mì</th>
              <th>Giá</th>
              <th>Miêu tả</th>
              <th>Ảnh</th>
              <th>Ngày Nhập</th>
              <th>Ngày Hết Hạn</th>
              <th>Số Lượng</th>
              <th> Nhà Cung Cấp</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
          {breads
     // Filter out items with undefined IDs
    .map((bread) => (
      <tr key={bread.id}>
        <td>{bread.id}</td>
        <td>{bread.name}</td>
        <td>{formatCurrency(bread.price)}</td>
        <td>{bread.description}</td>
        <td>
          <img
            src={bread.image_url}
            alt={bread.name}
            style={{ width: '100px', height: 'auto' }}
          />
        </td>
        <td>{formatDate(bread.entry_date)}</td>
        <td>{formatDate(bread.expiry_date)}</td>
        <td>{bread.quantity}</td>
        <td>{bread.supplier}</td>
        <td>
          <div className="container">
            <button className="edit" onClick={() => onEdit(bread)}>
              Sửa
            </button>
            <button className="delete" onClick={() => onDelete(bread.id)}>
              Xóa
            </button>
          </div>
        </td>
      </tr>
    ))}
          </tbody>
        </table>
      </div>

      {/* Add Button */}
      <div className="add-button-container">
        <button className="add" onClick={() => setModalVisible(true)}>
          Thêm Bánh Mì
        </button>
      </div>
    </div>
  );
};

export default Breads;
