import React, { useState, useEffect } from 'react';
import '../Styles/HomePage.css';
import { FaShoppingCart } from 'react-icons/fa';

const Homepage = ({ searchTerm }) => {
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [chickenDishes, setChickenDishes] = useState([]);
  const [noodlesDishes, setNoodlesDishes] = useState([]);
  const [breadDishes, setBreadDishes] = useState([]);  
  const [dessertDishes, setDessertDishes] = useState([]); 
  const [currentCategory, setCurrentCategory] = useState('featured');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartShake, setCartShake] = useState(false);

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

  return (
    <div className="homepage">
      {/* Category Buttons */}
      <div className="right-side-image">
        <img src="https://png.pngtree.com/png-vector/20240728/ourmid/pngtree-fried-chicken-illustration-png-image_13271391.png" alt="Fried chicken illustration" />
      </div>
      <div className="left-side-image">
        <img src="https://png.pngtree.com/png-clipart/20240619/original/pngtree-fried-chicken-cartoon-character-logo-png-image_15367262.png" alt="Fried chicken illustration" />
      </div>
      <div className="righttt-side-image">
        <img src="https://images.careerviet.vn/content/images/ve-ong-gia-noel-CareerBuilder-1.jpg" alt="Fried chicken illustration" />
      </div>
      <div className="rightcc-side-image">
        <img src="https://png.pngtree.com/png-vector/20241023/ourmid/pngtree-chibi-cute-kawaii-snowman-with-a-hat-and-red-scarf-snowflake-png-image_14144298.png" alt="Fried chicken illustration" />
      </div>

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