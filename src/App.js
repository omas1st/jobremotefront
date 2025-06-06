import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import WorkerDashboard from './pages/WorkerDashboard/WorkerDashboard';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';
import Withdrawal from './pages/Withdrawal/Withdrawal';
import VerifyWithdrawal from './pages/VerifyWithdrawal/VerifyWithdrawal';
import ContactUs from './pages/ContactUs/ContactUs';
import TasksPage from './pages/admin/TasksPage/TasksPage';

import AdminLogin from './pages/admin/AdminLogin';
import AdminPanel from './pages/admin/AdminPanel';
import UsersProfile from './pages/admin/UsersProfile';
import MessagePage from './pages/admin/MessagePage';
import WalletPage from './pages/admin/WalletPage';
import VerifyWithdrawalAdmin from './pages/admin/VerifyWithdrawalAdmin';
import PaymentURLPage from './pages/admin/PaymentURLPage';
import TaskPaymentApproval from './pages/admin/TaskPaymentApproval';
import StartTaskPage from './pages/admin/StartTaskPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* Worker */}
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/verify-withdrawal" element={<VerifyWithdrawal />} />

        {/* Customer */}
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/users" element={<UsersProfile />} />
        <Route path="/admin/messages" element={<MessagePage />} />
        <Route path="/admin/wallet" element={<WalletPage />} />
        <Route path="/admin/verify-pin" element={<VerifyWithdrawalAdmin />} />
        <Route path="/admin/tasks" element={<TasksPage />} />
        <Route path="/admin/payment-urls" element={<PaymentURLPage />} />
        <Route path="/admin/approve-tasks" element={<TaskPaymentApproval />} />
        <Route path="/admin/start-task-urls" element={<StartTaskPage />} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
