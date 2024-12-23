import React, { useState } from 'react';
import { FaShoppingCart, FaSearch,FaUserPlus ,FaUserAlt,FaSmile } from 'react-icons/fa';

import 'leaflet/dist/leaflet.css';
import '../Styles/header.css';
import axios from 'axios';

const Header = ({ setSearchTerm,  onLoginSuccess, }) => {
 
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false); // For register modal




  const [username, setUsername] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' }); // For registration
  const [otpCode, setOtpCode] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  // Handle input change for both login and registration
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setRegisterData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle login form submission
  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', loginData);
      if (response.status === 200) {
        

        setUsername(response.data.userName);
        setLoginSuccess(true);
        onLoginSuccess(true); 
        setIsLoginModalOpen(false);
        
        
      } else {
        alert('Đăng nhập thất bại.');
      }
    } catch (error) {
      alert('Lỗi khi đăng nhập: ' + error.message);
    }
  };

  // Handle registration form submission
// Gửi yêu cầu đăng ký và nhận OTP
const handleRegisterSubmit = async () => {
  try {
    // Gửi dữ liệu đăng ký tới backend
    const response = await axios.post('http://localhost:5000/api/users/register', {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
     

  
  });

    if (response.status === 200) {
      alert('Vui lòng kiểm tra email để xác nhận OTP.');
      setIsRegisterModalOpen(false); // Đóng modal đăng ký
      setIsOTPModalOpen(true);       // Mở modal xác minh OTP
    }
  } catch (error) {
    // Hiển thị thông báo lỗi chi tiết từ backend
    console.error('Lỗi đăng ký:', error.response?.data || error.message);
    alert('Lỗi khi đăng ký: ' + (error.response?.data.message || error.message));
  }
};

// Gửi yêu cầu xác minh OTP
const handleOTPSubmit = async () => {
  try {
    // Gửi email và OTP tới backend
    const response = await axios.post('http://localhost:5000/api/users/otp', {
      email: registerData.email, // Email từ dữ liệu đăng ký
      otp: otpCode,              // OTP nhập từ người dùng
    });

    if (response.status === 201) { // 201 vì API trả về khi tạo user thành công
      alert('Xác minh thành công! Tài khoản đã được đăng ký.');
      setIsOTPModalOpen(false); // Đóng modal OTP
      setRegisterData({ name: '', email: '', password: '' });
      setOtpCode('');
    }
  } catch (error) {
    // Xử lý lỗi từ server
    console.error('Lỗi OTP:', error.response?.data || error.message);
    alert('Lỗi khi xác minh OTP: ' + (error.response?.data.message || error.message));
  }
};

  
  

  
  const handleSearch = () => {
    setSearchTerm(searchInput); // Cập nhật từ khóa tìm kiếm
  };

  
 



  return (
    <>
      <header className="header">
      <div className="top-left-image-container">
  
  </div>
      
        <a href="/" className="logo">
          <img
            src="https://png.pngtree.com/png-vector/20241025/ourmid/pngtree-fried-chicken-logo-vector-png-image_14169441.png"
            alt="FoodStore Logo"
            className="logo-image"
          />
          
        </a>
        <div className="search-container">
  <div className="search-bar-wrapper">
    <FaSearch className="search-icon" />
    <input
      type="text"
      className="search-bar"
      placeholder="Tìm món ăn..."
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
    <button className="search-button" onClick={handleSearch}>
      <FaSearch />
    </button>
  </div>
</div>


<div className="header-actions">
          
          {!username ? (
            <>
              <button className="auth-button" onClick={() => setIsLoginModalOpen(true)}>
              <FaUserAlt className="auth-icon" />
                Đăng nhập
              </button>
              <button className="auth-button" onClick={() => setIsRegisterModalOpen(true)}>
              <FaUserPlus className="auth-icon" />
                Đăng ký
              </button>
            </>
          ) : (
            <div className="user-info">
            <span className="username">Xin chào, {username}</span>
            {loginSuccess && (
                <FaSmile className="smiley-icon animated-smile" style={{ color: '#ffcc00' }} />
)}

          </div>
           
          )}
          <FaShoppingCart className="cart-icon" />
          
        </div>
       

       
        
      </header>
      
      {/* Map Modal */}
      

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Đăng nhập</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => handleInputChange(e, 'login')}
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={loginData.password}
              onChange={(e) => handleInputChange(e, 'login')}
            />
            <div className="modal-actions">
              <button onClick={handleLoginSubmit} className="confirm-button">
                Đăng nhập
              </button>
              <button onClick={() => setIsLoginModalOpen(false)} className="cancel-button">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Đăng ký</h2>
            <input
              type="text"
              name="name"
              placeholder="Tên"
              value={registerData.name}
              onChange={(e) => handleInputChange(e, 'register')}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => handleInputChange(e, 'register')}
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={registerData.password}
              onChange={(e) => handleInputChange(e, 'register')}
            />
            <div className="modal-actions">
              <button onClick={handleRegisterSubmit} className="confirm-button">
                Gửi Mã OTP
              </button>
              <button onClick={() => setIsRegisterModalOpen(false)} className="cancel-button">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
       {isOTPModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Xác minh OTP</h2>
       
            <input
              type="text"
              placeholder="Nhập mã OTP"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleOTPSubmit} className="confirm-button">
                Xác minh
              </button>
              <button onClick={() => setIsOTPModalOpen(false)} className="cancel-button">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;