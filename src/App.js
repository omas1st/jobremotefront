import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import WorkerDashboard from './pages/WorkerDashboard/WorkerDashboard';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';
import Withdrawal from './pages/Withdrawal/Withdrawal';
import VerifyWithdrawal from './pages/VerifyWithdrawal/VerifyWithdrawal';
import ContactUs from './pages/ContactUs/ContactUs';
import TasksPage from './pages/admin/TasksPage/TasksPage';
import AdminLogin from './pages/admin/AdminLogin/AdminLogin';
import AdminPanel from './pages/admin/AdminPanel/AdminPanel';
import UsersPage from './pages/admin/UsersPage/UsersPage';
import MessagesPage from './pages/admin/MessagesPage/MessagesPage';
import WalletPage from './pages/admin/WalletPage/WalletPage';
import VerifyWithdrawalPage from './pages/admin/VerifyWithdrawalPage/VerifyWithdrawalPage';
import PaymentURLsPage from './pages/admin/PaymentURLsPage/PaymentURLsPage';
import TaskApprovalsPage from './pages/admin/TaskApprovalsPage/TaskApprovalsPage';

// simple hook to read admin token
const useAdminAuth = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

// wrapper that redirects to /admin/login if not logged in
function AdminProtectedRoute() {
  const auth = useAdminAuth();
  return auth ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/verify-withdrawal" element={<VerifyWithdrawal />} />

        {/* admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* protected admin panel */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminPanel />}>
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="verify-withdrawal" element={<VerifyWithdrawalPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="payment-urls" element={<PaymentURLsPage />} />
            <Route path="task-approvals" element={<TaskApprovalsPage />} />
          </Route>
        </Route>

        {/* catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
