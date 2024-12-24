// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Foods from './components/Foods'; 
import Breads from './components/Breads'; 
import Drinks from './components/Drinks'; 
import Noodless from './components/Noodles'; 
import Desserts from './components/Desserts';
import Orders from './components/Order'
function App() {
  const [selectedMenu, setSelectedMenu] = useState('');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="App">
      <Sidebar onMenuClick={handleMenuClick} />
      <div className="main-content">
      {selectedMenu === 'Bánh mì' && <Breads />}
        {selectedMenu === 'Bánh mì' && <Breads />}
        {selectedMenu === 'Thức Uống' && <Drinks />}
        {selectedMenu === 'Gà Ngon' && <Foods />}
        {selectedMenu === 'Tráng miệng' && <Desserts/>}
        {selectedMenu === 'Mì' && <Noodless />}
        {selectedMenu === 'Hóa đơn' && <Orders />}
      </div>
    </div>
  );
}

export default App;
