import React, { useState } from 'react';
import Header from './components/Ui/header';
import Homepage from './components/Ui/HomePage';
import Poster from './components/Ui/Poster';
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  return (
    <>
      <Header setSearchTerm={setSearchTerm} onLoginSuccess={setIsLoggedIn} setUsername={setUsername}  />
      <Homepage searchTerm={searchTerm} isLoggedIn={isLoggedIn}  username={username} />
      <Poster/>
    </>
  );
};

export default App;
