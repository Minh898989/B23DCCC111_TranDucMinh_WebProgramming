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
  const [flyItem, setFlyItem] = useState(null);

  useEffect(() => {
    if (currentCategory === 'chicken') {
      fetch('http://localhost:5000/api/foods')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);  // Kiểm tra dữ liệu trả về từ API
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

  const addToCart = (dish, event) => {
    const existingItem = cart.find((item) => item.id === dish.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...dish, quantity: 1 }]);
    }

    // Add flying animation
    const flyImg = event.target.closest('.dish-card')?.querySelector('.dish-image');
    if (flyImg) {
      const rect = flyImg.getBoundingClientRect();
      const cartIcon = document.querySelector('.cart-icon');

      setFlyItem({
        id: dish.id,
        image_url: dish.image_url,
        startX: rect.left,
        startY: rect.top,
        endX: cartIcon.offsetLeft + cartIcon.offsetWidth / 2,
        endY: cartIcon.offsetTop + cartIcon.offsetHeight / 2,
      });

      setTimeout(() => setFlyItem(null), 1000); // Remove the flying item after animation
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="body">
      <div className="homepage">
        {/* Category Buttons */}
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
        <div className="cart-icon-container" onClick={() => setIsCartOpen(!isCartOpen)}>
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        </div>

        {/* Dishes */}
        <div className="dishes-container">
          {getCurrentDishes().map((dish) => (
            <div className="dish-card" key={dish.id}>
              <img src={dish.image_url} alt={dish.image_url} className="dish-image" />
              <h3 className="dish-name">{dish.name}</h3>
              <p className="dish-price">{formatPrice(dish.price)} VNĐ</p>

              <button className="add-to-cart-buttonss" onClick={(e) => addToCart(dish, e)}>
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>

        {/* Flying animation */}
        {flyItem && (
          <img
            src={flyItem.image_url}
            alt="Flying item"
            className="fly-item"
            style={{
              top: flyItem.startY,
              left: flyItem.startX,
              animation: `fly-to-cart 1s ease-in-out forwards`,
              '--endX': `${flyItem.endX}px`,
              '--endY': `${flyItem.endY}px`,
            }}
          />
        )}

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
    </div>
  );
};

export default Homepage;
