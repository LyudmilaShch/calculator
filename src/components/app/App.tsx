import React from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';

import { Calculator } from '../calculator/Calculator';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Calculator />} />
      </Routes>
    </div>
  );
};

export default App;
