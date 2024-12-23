import React, { useState } from 'react';
import Header from './components/Ui/header';
import Homepage from './components/Ui/HomePage';
import Poster from './components/Ui/Poster';
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
  return (
    <>
      <Header setSearchTerm={setSearchTerm} onLoginSuccess={setIsLoggedIn}   />
      <Homepage searchTerm={searchTerm} isLoggedIn={isLoggedIn}  />
      <Poster/>
    </>
  );
};

export default App;
