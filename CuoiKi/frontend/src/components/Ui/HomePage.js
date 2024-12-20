import React, { useState, useEffect } from 'react';
import '../Styles/HomePage.css';
import { FaShoppingCart } from 'react-icons/fa';

const Homepage = () => {
  const featuredDishes = [
    { id: 1, name: 'Gà rán giòn', price: 150000, image_url: 'https://jollibee.com.vn/media/catalog/category/Combo_ba_n_cha_y.jpg' },
    { id: 2, name: 'Hamburger phô mai', price: 70000, image_url: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/h/_/h_nh_m_n.jpg' },
    { id: 3, name: 'Pizza hải sản', price: 120000, image_url: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_n_ngon_ph_i_th_-_3.png' },
    { id: 4, name: 'Trà sữa trân châu', price: 30000, image_url: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_s_t_cay_-_2-compressed.jpg' },
    { id: 5, name: 'Trà sữa', price: 30000, image_url: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_s_t_cay_-_3-compressed.jpg' },
  ];

  const [chickenDishes, setChickenDishes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('featured');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartShake, setCartShake] = useState(false); // State for cart shake effect

  useEffect(() => {
    if (currentCategory === 'chicken') {
      fetch('http://localhost:5000/api/foods')
        .then((response) => response.json())
        .then((data) => {
          setChickenDishes(data);
        })
        .catch((error) => console.error('Error fetching chicken dishes:', error));
    }
  }, [currentCategory]);

  const getCurrentDishes = () => {
    return currentCategory === 'featured' ? featuredDishes : chickenDishes;
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

    // Trigger the cart shake effect after adding an item
    setCartShake(true);
    setTimeout(() => setCartShake(false), 1500); // Reset shake effect after 1.5 seconds
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    
      <div className="homepage">
        {/* Category Buttons */}
        <div className="right-side-image">
           <img src="https://png.pngtree.com/png-vector/20240728/ourmid/pngtree-fried-chicken-illustration-png-image_13271391.png" alt="Fried chicken illustration" />
        </div>
        <div className="left-side-image">
           <img src="https://png.pngtree.com/png-clipart/20240619/original/pngtree-fried-chicken-cartoon-character-logo-png-image_15367262.png" alt="Fried chicken illustration" />
        </div>

        <div className="category-buttons">
          <button
            className={`add-to-cart-button ${currentCategory === 'featured' ? 'active' : ''}`}
            onClick={() => setCurrentCategory('featured')}
          >
            <img
              src="https://jollibee.com.vn/media/catalog/product/cache/11f3e6435b23ab624dc55c2d3fe9479d/g/_/g_gi_n_vui_v_-_8_1.png"
              alt="Featured icon"
              className="button-icon"
            />
            Món ngon nổi bật
          </button>

          <button
            className={`add-to-cart-button ${currentCategory === 'chicken' ? 'active' : ''}`}
            onClick={() => setCurrentCategory('chicken')}
          >
            <img
              src="https://jollibee.com.vn/media/catalog/product/cache/11f3e6435b23ab624dc55c2d3fe9479d/g/_/g_gi_n_vui_v_-_8_1.png"
              alt="Chicken icon"
              className="button-icon"
            />
            Gà ngon
          </button>
        </div>

        {/* Cart Icon */}
        <div className={`cart-icon-container ${cartShake ? 'shake' : ''}`} onClick={() => setIsCartOpen(!isCartOpen)}>
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">
            {cart.reduce((total, item) => total + item.quantity, 0)} {/* Tổng số sản phẩm trong giỏ */}
          </span>
        </div>

        {/* Dishes */}
        <div className="dishes-container">
          {getCurrentDishes().map((dish) => (
            <div className="dish-card" key={dish.id}>
              <img src={dish.image_url} alt={dish.name} className="dish-image" />
              <h3 className="dish-name">{dish.name}</h3>
              <p className="dish-price">{formatPrice(dish.price)} VNĐ</p>

              <button className="add-to-cart-buttonss" onClick={() => addToCart(dish)}>
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>

        {/* Cart Modal */}
        {isCartOpen && (
          <div className="cart-modal">
            <div className="cart-modal-content">
              <h2>Giỏ hàng</h2>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} x {formatPrice(item.price)} VNĐ
                  </li>
                ))}
              </ul>
              <p>Tổng tiền: {formatPrice(calculateTotal())} VNĐ</p>
              <button onClick={() => setIsCartOpen(false)}>Đóng</button>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default Homepage;
