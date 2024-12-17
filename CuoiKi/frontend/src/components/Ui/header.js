import React, { useState } from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../Styles/header.css';
import axios from 'axios';

const Header = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); // OTP Modal state
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 21.0285, // Default latitude for Hanoi
    lng: 105.8542, // Default longitude for Hanoi
  });
  const [locationText, setLocationText] = useState('');
  const [username, setUsername] = useState('');
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState(''); // OTP state
  const [otpSent, setOtpSent] = useState(false); // Check if OTP is sent

  const getAddressFromCoordinates = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    const fullAddress = data.display_name;

    const addressParts = fullAddress.split(',').map(part => part.trim());
    const addressWithoutLastParts = addressParts.slice(0, addressParts.length - 2).join(', ');

    return addressWithoutLastParts;
  };

  const handleConfirmLocation = async () => {
    const address = await getAddressFromCoordinates(selectedLocation.lat, selectedLocation.lng);
    setLocationText(`Vị trí: ${address}`);
    setIsMapOpen(false);
  };

  const updateLocation = () => {
    setIsMapOpen(true);
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setRegisterData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', loginData);
      if (response.status === 200) {
        setUsername(loginData.name);
        setIsLoginModalOpen(false);
      } else {
        alert('Đăng nhập thất bại.');
      }
    } catch (error) {
      alert('Lỗi khi đăng nhập: ' + error.message);
    }
  };

  const handleRegisterSubmit = async () => {
    if (!otpSent) {
      try {
        // Send OTP request
        const response = await axios.post('http://localhost:5000/api/users/otp', {
          email: registerData.email
        });
        console.log('OTP sent response:', response);
        if (response.status === 200) {
          setOtpSent(true);
          setIsOtpModalOpen(true); // Open OTP modal after OTP is sent
          alert('Mã OTP đã được gửi đến email của bạn.');
        } else {
          alert('Gửi mã OTP thất bại.');
        }
      } catch (error) {
        alert('Lỗi khi gửi mã OTP: ' + error.message);
      }
    } else {
      // Verify OTP and complete registration
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', { ...registerData, otp });
        console.log('Full response:', response); 
        if (response.status === 200) {
          alert('Đăng ký thành công! Vui lòng đăng nhập.');
          setIsRegisterModalOpen(false);
        } else {
          alert('Đăng ký thất bại.');
        }
      } catch (error) {
        alert('Lỗi khi đăng ký: ' + error.message);
      }
    }
  };

  const handleOtpInputChange = (e) => {
    setOtp(e.target.value);
  };

  const LocationUpdater = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setSelectedLocation({ lat, lng });
      },
    });
    return null;
  };

  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          <img
            src="https://jollibee.com.vn/static/version1732806380/frontend/Jollibee/default/vi_VN/images/logo.png"
            alt="FoodStore Logo"
            className="logo-image"
          />
        </a>
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Tìm món ăn..." />
          <FaSearch className="search-icon" />
        </div>
        <div className="header-actions">
          <div className="location-container">
            <MdLocationOn className="location-icon" onClick={updateLocation} title="Update Location" />
            <span className="location-text">{locationText}</span>
          </div>
          {!username ? (
            <>
              <button className="auth-button" onClick={() => setIsLoginModalOpen(true)}>
                Đăng nhập
              </button>
              <button className="auth-button" onClick={() => setIsRegisterModalOpen(true)}>
                Đăng ký
              </button>
            </>
          ) : (
            <span className="username">Xin chào, {username}</span>
          )}
          <FaShoppingCart className="cart-icon" />
        </div>
      </header>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <MapContainer
              center={selectedLocation}
              zoom={15}
              style={{ width: '100%', height: '300px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <LocationUpdater />
              <Marker position={selectedLocation}>
                <Popup>Vị trí của bạn: {selectedLocation.lat}, {selectedLocation.lng}</Popup>
              </Marker>
            </MapContainer>
            <div className="modal-actions">
              <button onClick={handleConfirmLocation} className="confirm-button">
                Xác nhận
              </button>
              <button onClick={() => setIsMapOpen(false)} className="cancel-button">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Đăng nhập</h2>
            <input
              type="text"
              name="name"
              placeholder="Tên đăng nhập"
              value={loginData.name}
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
              placeholder="Tên người dùng"
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
                {otpSent ? 'Xác nhận OTP' : 'Đăng ký'}
              </button>
              <button onClick={() => setIsRegisterModalOpen(false)} className="cancel-button">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {isOtpModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Nhập mã OTP</h2>
            <input
              type="text"
              placeholder="Mã OTP"
              value={otp}
              onChange={handleOtpInputChange}
            />
            <div className="modal-actions">
              <button onClick={handleRegisterSubmit} className="confirm-button">
                Xác nhận
              </button>
              <button onClick={() => setIsOtpModalOpen(false)} className="cancel-button">
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
