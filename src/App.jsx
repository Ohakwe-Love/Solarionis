
import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import InvestmentPage from "./Pages/InvestmentPage";
import WealthPage from "./Pages/WealthPage";
import AboutPage from "./Pages/AboutPage";
import Register from "./Pages/Register";
// import ShopPage from "./Pages/ShopPage";
import FaqPage from "./Pages/FaqPage";
// import { CartProvider } from './context/CartContext';
import NotFoundPage from "./Pages/NotFoundPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/investment" element={<InvestmentPage />} />
        <Route path="/wealth" element={<WealthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App