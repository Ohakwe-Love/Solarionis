import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import InvestmentPage from "./Pages/InvestmentPage";
import WealthPage from "./Pages/WealthPage";
import AboutPage from "./Pages/AboutPage";
import TermsOfService from "./Pages/TermsOfService";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import HelpPage from "./Pages/HelpPage";
import FaqPage from "./Pages/FaqPage";
import NotFoundPage from "./Pages/NotFoundPage";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import DashboardLayout from "./components/Layout/DashboardLayout";
import UserOverview from "./Pages/UserOverview";
import UserPortfolio from "./Pages/UserPortfolio";
import UserInvest from "./Pages/UserInvest";
import UserWallet from "./Pages/UserWallet";
import UserDocuments from "./Pages/UserDocuments";
import UserSettings from "./Pages/UserSettings";
import KycVerification from './Pages/KycVerification';
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminRoute from "./admin/AdminRoute";
import AdminGuestRoute from "./admin/AdminGuestRoute";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminProfile from "./admin/pages/AdminProfile";

// Import route guards
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Anyone can access */}
        <Route path="/" element={<HomePage />} />
        <Route path="/investment" element={<InvestmentPage />} />
        <Route path="/wealth" element={<WealthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Guest Only Routes - Logged in users will be redirected to dashboard */}
        <Route 
          path="/register" 
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          } 
        />

        <Route
          path="/admin/login"
          element={
            <AdminGuestRoute>
              <AdminLogin />
            </AdminGuestRoute>
          }
        />

        {/* Protected Dashboard Routes - Only authenticated users can access */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserOverview />} />
          <Route path="portfolio" element={<UserPortfolio />} />
          <Route path="invest" element={<UserInvest />} />
          <Route path="kyc" element={<KycVerification />} />
          <Route path="wallet" element={<UserWallet />} />
          <Route path="documents" element={<UserDocuments />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
