import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Foods from './components/Foods'; 
import Breads from './components/Breads'; 
import Drinks from './components/Drinks'; 
import Noodless from './components/Noodles'; 
import Desserts from './components/Desserts';
import Orders from './components/Order';
import Login from './components/Login'; // Import the Login component

function App() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state to true
  };

  return (
    <div className="App">
      {isLoggedIn ? ( // Conditional rendering based on login state
        <>
          <Sidebar onMenuClick={handleMenuClick} />
          <div className="main-content">
            {selectedMenu === 'Bánh mì' && <Breads />}
            {selectedMenu === 'Thức Uống' && <Drinks />}
            {selectedMenu === 'Gà Ngon' && <Foods />}
            {selectedMenu === 'Tráng miệng' && <Desserts />}
            {selectedMenu === 'Mì' && <Noodless />}
            {selectedMenu === 'Hóa đơn' && <Orders />}
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
