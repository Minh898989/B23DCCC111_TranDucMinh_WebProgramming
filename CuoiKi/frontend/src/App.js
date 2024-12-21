import React, { useState } from 'react';
import Header from './components/Ui/header';
import Homepage from './components/Ui/HomePage';
import Poster from './components/Ui/Poster';
const App = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Trạng thái từ khóa tìm kiếm

  return (
    <>
      <Header setSearchTerm={setSearchTerm} />
      <Homepage searchTerm={searchTerm} />
      <Poster/>
    </>
  );
};

export default App;
