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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/verify-withdrawal" element={<VerifyWithdrawal />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/admin/tasks" element={<TasksPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;