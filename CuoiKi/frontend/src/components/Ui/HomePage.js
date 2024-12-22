import React, { useState, useEffect } from 'react';
import '../Styles/HomePage.css';
import { FaShoppingCart } from 'react-icons/fa';
import MapModal from './MapModal'
import { FaMapMarkerAlt } from 'react-icons/fa'; // Add location icon




const Homepage = ({ searchTerm,isLoggedIn,}) => {
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [chickenDishes, setChickenDishes] = useState([]);
  const [noodlesDishes, setNoodlesDishes] = useState([]);
  const [breadDishes, setBreadDishes] = useState([]);  
  const [dessertDishes, setDessertDishes] = useState([]); 
  const [currentCategory, setCurrentCategory] = useState('featured');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartShake, setCartShake] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ lat: 21.0285, lng: 105.8542 }); // Default to Hanoi's coordinates
  const [locationText, setLocationText] = useState('');
  const [receiverName, setReceiverName] = useState(''); // Renamed 'name' to 'receiverName'
  const [phoneNumber, setPhoneNumber] = useState(''); // Defined 'phoneNumber' state
 


  // Background image state


  // Fetch dishes based on category (same as your current useEffect logic)
  useEffect(() => {
    if (currentCategory === 'featured') {
      fetch('http://localhost:5000/api/drinks')
        .then((response) => response.json())
        .then((data) => setFeaturedDishes(data))
        .catch((error) => console.error('Error fetching featured dishes:', error));
    }
  }, [currentCategory]);



  useEffect(() => {
    if (currentCategory === 'chicken') {
      fetch('http://localhost:5000/api/foods')
        .then((response) => response.json())
        .then((data) => setChickenDishes(data))
        .catch((error) => console.error('Error fetching chicken dishes:', error));
    }
  }, [currentCategory]);

  useEffect(() => {
    if (currentCategory === 'noodles') {
      fetch('http://localhost:5000/api/noodless')
        .then((response) => response.json())
        .then((data) => setNoodlesDishes(data))
        .catch((error) => console.error('Error fetching noodles dishes:', error));
    }
  }, [currentCategory]);

  useEffect(() => {
    if (currentCategory === 'bread') {
      fetch('http://localhost:5000/api/breads')
        .then((response) => response.json())
        .then((data) => setBreadDishes(data))
        .catch((error) => console.error('Error fetching bread dishes:', error));
    }
  }, [currentCategory]);
  useEffect(() => {
    if (currentCategory === 'dessert') {
      fetch(' http://localhost:5000/api/dessert')
        .then((response) => response.json())
        .then((data) => setDessertDishes(data))
        .catch((error) => console.error('Error fetching featured dishes:', error));
    }
  }, [currentCategory]);
  

  const getCurrentDishes = () => {
    const categoryMap = {
      featured: featuredDishes,
      chicken: chickenDishes,
      noodles: noodlesDishes,
      bread: breadDishes,
      dessert: dessertDishes,
    };

    const dishes = categoryMap[currentCategory] || [];
    return searchTerm
      ? dishes.filter((dish) =>
          dish.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : dishes;
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  const addToCart = (dish) => {
    const existingItem = cart.find((item) => item.id === dish.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...dish, quantity: 1 }]);
    }

    setCartShake(true);
    setTimeout(() => setCartShake(false), 1500);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const handleCheckout = () => {
    if ( !isLoggedIn ) {
      alert('Vui lòng đăng nhập để thanh toán');
      setIsCartOpen(false);
    } else {
      alert(`Xác nhận đơn hàng của `);
      setIsOrderModalOpen(true);
      setIsCartOpen(false);
      
      
    }
  };
  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart); // Giả sử `setCart` là hàm cập nhật trạng thái giỏ hàng
  };


  return (
    <div className='home'>
       
    <div className="homepage">
      {/* Category Buttons */}
      
      
      
      <div className="category-buttons" >
        <button
          className={`add-to-cart-button ${currentCategory === 'featured' ? 'active' : ''}`}
          onClick={() => setCurrentCategory('featured')}
        >
          <img
            src="https://jollibee.com.vn//media/catalog/category/thucuong.png"
            alt="Featured icon"
            className="button-icon"
          />
          Đồ Uống
        </button>

        <button
          className={`add-to-cart-button ${currentCategory === 'chicken' ? 'active' : ''}`}
          onClick={() => setCurrentCategory('chicken')}
        >
          <img
            src="https://jollibee.com.vn//media/catalog/category/web-05_1.png"
            alt="Chicken icon"
            className="button-icon"
          />
          Gà Ngon
        </button>

        <button
          className={`add-to-cart-button ${currentCategory === 'noodles' ? 'active' : ''}`}
          onClick={() => setCurrentCategory('noodles')}
        >
          <img
            src="https://jollibee.com.vn//media/catalog/category/web-06.png"
            alt="Noodles icon"
            className="button-icon"
          />
          Mì
        </button>
        <button
          className={`add-to-cart-button ${currentCategory === 'bread' ? 'active' : ''}`}
          onClick={() => setCurrentCategory('bread')}
        >
          <img
            src="https://jollibee.com.vn//media/catalog/category/cat_burger_1.png"
            alt="Bread icon"
            className="button-icon"
          />
          Bánh mì & các loại
        </button>
        <button
          className={`add-to-cart-button ${currentCategory === 'dessert' ? 'active' : ''}`}
          onClick={() => setCurrentCategory('dessert')}
        >
          <img
            src="https://jollibee.com.vn//media/catalog/category/trangmieng.png"
            alt="dessert icon"
            className="button-icon"
          />
          Tráng Miệng
        </button>
        
        
      </div>

      <div className={`cart-icon-container ${cartShake ? 'shake' : ''}`} onClick={() => setIsCartOpen(!isCartOpen)}>
        <FaShoppingCart className="cart-icon" />
        <span className="cart-count">
          {cart.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </div>

      <div className="dishes-container">
        {getCurrentDishes().map((dish) => (
          <div className="dish-card" key={dish.id}>
            <img src={dish.image_url} alt={dish.image_url} className="dish-image" />
            <h3 className="dish-name">{dish.name}</h3>
            <p className="dish-price">{formatPrice(dish.price)} VNĐ</p>

            <button className="add-to-cart-buttonss" onClick={() => addToCart(dish)}>
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>

      {isCartOpen && (
      <div className="cart-modal">
      <div className="cart-modal-content">
        <div className="cart-header">
          <h2>🛒 Giỏ hàng của bạn</h2>
          <button onClick={() => setIsCartOpen(false)} className="close-button">
            ❌
          </button>
        </div>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} className="item-image" />
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <p>
                  {item.quantity} x {formatPrice(item.price)} VNĐ
                </p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
        <p className="total-price">💰 Tổng tiền: {formatPrice(calculateTotal())} VNĐ</p>
        <button onClick={handleCheckout} className="checkout-button">
          Đặt hàng
        </button>
      </div>
    </div>
    
     
      )}
      {isOrderModalOpen && (
  <div className="order-modal">
    <div className="order-modal-content">
      <div className="order-header">
        <h2>Thông tin đặt hàng</h2>
        <button onClick={() => setIsOrderModalOpen(false)} className="close-button">
          ❌
        </button>
      </div>
      <div className="order-body">
      <div className="order-details">
      <label>
          <strong>Tên người nhận:</strong>
          <input
            type="text"
            placeholder="Nhập tên người nhận"
            value={receiverName} // Updated variable name
            onChange={(e) => setReceiverName(e.target.value)} 
          />
        </label>
          </div>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="order-item">
              <img src={item.image_url} alt={item.name} className="item-image" />
              <span>{item.quantity} x {item.name}</span> - <span>{formatPrice(item.price * item.quantity)} VNĐ</span>
            </li>
          ))}
        </ul>
        <p><strong>Tổng tiền:</strong> {formatPrice(calculateTotal())} VNĐ</p>
        <div className="order-details">
        <label>
          <strong>Số điện thoại:</strong>
          <input
            type="text"
            placeholder="Nhập số điện thoại của bạn"
            value={phoneNumber} // Defined 'phoneNumber' as a state variable
            onChange={(e) => setPhoneNumber(e.target.value)} 
          />
        </label>
        </div>
        <div className="map-location">
                  <FaMapMarkerAlt />
                  <span>{locationText }</span>
                  <button onClick={() => setIsMapOpen(true)} className="location-button">Chọn địa chỉ</button>
                </div>
       
      </div>
      <div className="order-footer">
      <button
          onClick={async () => {
            const orderData = {
              receiverName,
              phoneNumber,
              location: locationText,
              items: cart.map((item) => ({
                name: item.name,
                soluong: item.quantity,
              })),
            };

            try {
              const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
              });

              if (response.ok) {
               // const data = await response.json();
                alert('Đặt hàng thành công!');
                setCart([]); // Clear the cart
                setIsOrderModalOpen(false); // Close the modal
              } else {
                throw new Error('Lỗi khi đặt hàng');
              }
            } catch (error) {
              console.error('Error placing order:', error);
              alert('Đặt hàng thất bại. Vui lòng thử lại.');
            }
          }}
          className="confirm-order-button"
        >
          Xác nhận đặt hàng
        </button>

      </div>
    </div>
  </div>
)}{isMapOpen && (
  <MapModal
    selectedLocation={selectedLocation}
    setSelectedLocation={setSelectedLocation}
    setLocationText={setLocationText}
    setIsMapOpen={setIsMapOpen}
  />
)}


    </div>
    </div>
  );
};

export default Homepage;