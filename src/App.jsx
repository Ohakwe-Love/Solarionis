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
import AdminDeposits from "./admin/pages/AdminDeposits";
import AdminWithdrawals from "./admin/pages/AdminWithdrawals";
import AdminInvestments from "./admin/pages/AdminInvestments";
import AdminProjects from "./admin/pages/AdminProjects";
import AdminTestimonials from "./admin/pages/AdminTestimonials";
import AdminLedger from "./admin/pages/AdminLedger";
import AdminProfile from "./admin/pages/AdminProfile";

// Import route guards
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import ReviewsPage from "./Pages/ReviewsPage";


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
        <Route path="/reviews" element={<ReviewsPage />} />
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
          <Route path="deposits" element={<AdminDeposits />} />
          <Route path="withdrawals" element={<AdminWithdrawals />} />
          <Route path="investments" element={<AdminInvestments />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="ledger" element={<AdminLedger />} />
          <Route path="orders" element={<AdminDeposits />} />
          <Route path="products" element={<AdminWithdrawals />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
