// src/components/Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onMenuClick }) => {
  const [isKhoOpen, setIsKhoOpen] = useState(false);
  
  const toggleKho = () => {
    setIsKhoOpen(!isKhoOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item" onClick={toggleKho}>
        <span>Kho hàng</span>
        <i className={`arrow ${isKhoOpen ? 'rotate' : ''}`}></i>
      </div>
      {isKhoOpen && (
        <div className="submenu">
          <div className="submenu-item" onClick={() => onMenuClick('Thức Uống')}>Đồ uống</div>
          <div className="submenu-item" onClick={() => onMenuClick('Bánh mì')}>Bánh mì</div>
          <div className="submenu-item" onClick={() => onMenuClick('Gà Ngon')}>Gà Ngon</div>
          <div className="submenu-item" onClick={() => onMenuClick('Tráng miệng')}>Tráng miệng</div>
          <div className="submenu-item" onClick={() => onMenuClick('Mì')}>Mì</div>
         
        </div>
      )}
      <div className="sidebar-item" onClick={() => onMenuClick('Hóa đơn')}>
        <span>Hóa đơn</span>
      </div>
    </div>
  );
};

export default Sidebar;
