import React from 'react';
import { AddShoppingCart } from '@mui/icons-material'; // Material-UI Icon
import '../Styles/fooditem.css';

const FoodItem = ({ food }) => {
  return (
    <div className="food-item">
      <img src={food.image} alt={food.name} />
      <h3>{food.name}</h3>
      <p>Giá: {food.price.toLocaleString()} VND</p>
      <button className="btn-secondary">
        <AddShoppingCart style={{ marginRight: '8px' }} />
        Thêm vào giỏ
      </button>
    </div>
  );
};

export default FoodItem;
