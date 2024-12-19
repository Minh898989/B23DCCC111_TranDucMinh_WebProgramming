import React, { useState } from 'react';
import '../Styles/HomePage.css';

const Homepage = () => {
  const featuredDishes = [
    { id: 1, name: 'Gà rán giòn', price: '50,000 VND', image: 'https://jollibee.com.vn/media/catalog/category/Combo_ba_n_cha_y.jpg' },
    { id: 2, name: 'Hamburger phô mai', price: '70,000 VND', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/h/_/h_nh_m_n.jpg' },
    { id: 3, name: 'Pizza hải sản', price: '120,000 VND', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/m/_/m_n_ngon_ph_i_th_-_3.png' },
    { id: 4, name: 'Trà sữa trân châu', price: '30,000 VND', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_s_t_cay_-_2-compressed.jpg' },
    { id: 5, name: 'Trà sữa', price: '30,000 VND', image: 'https://jollibee.com.vn/media/catalog/product/cache/9011257231b13517d19d9bae81fd87cc/g/_/g_s_t_cay_-_3-compressed.jpg' },
  ];

  const chickenDishes = [
    { id: 6, name: 'Gà rán xốt mật ong', price: '55,000 VND', image: 'https://example.com/chicken1.jpg' },
    { id: 7, name: 'Gà nướng cay', price: '60,000 VND', image: 'https://example.com/chicken2.jpg' },
    { id: 8, name: 'Gà kho gừng', price: '65,000 VND', image: 'https://example.com/chicken3.jpg' },
    { id: 9, name: 'Gà chiên mắm', price: '70,000 VND', image: 'https://example.com/chicken4.jpg' },
    { id: 10, name: 'Gà sốt bơ tỏi', price: '75,000 VND', image: 'https://example.com/chicken5.jpg' },
  ];

  const [currentCategory, setCurrentCategory] = useState('featured');

  const getCurrentDishes = () => {
    if (currentCategory === 'featured') return featuredDishes;
    if (currentCategory === 'chicken') return chickenDishes;
    return [];
  };

  return (
    <div className='body'>
      <div className="homepage">
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

        <div className="dishes-container">
          {getCurrentDishes().map((dish) => (
            <div className="dish-card" key={dish.id}>
              <img src={dish.image} alt={dish.name} className="dish-image" />
              <h3 className="dish-name">{dish.name}</h3>
              <p className="dish-price">{dish.price}</p>
              <button className="add-to-cart-buttonss">Thêm vào giỏ</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
