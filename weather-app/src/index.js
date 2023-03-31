import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Forecast from './Components/Forecast';
import dataContext from './Components/Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <dataContext.Provider value={[]}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/forecast' element={<Forecast />} />
        </Routes>
      </BrowserRouter>
    </dataContext.Provider>
  </React.StrictMode>
);

