
import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
// import AboutPage from "./Pages/AboutPage";
// import ContactPage from "./Pages/ContactPage";
// import ShopPage from "./Pages/ShopPage";
// import CartPage from "./Pages/CartPage";
// import CheckoutPage from "./Pages/CheckoutPage";
// import FaqPage from "./Pages/FaqPage";
// import { CartProvider } from './context/CartContext';
import NotFoundPage from "./Pages/NotFoundPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App