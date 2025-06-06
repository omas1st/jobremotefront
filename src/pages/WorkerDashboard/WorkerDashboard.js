import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import TaskCard from '../../components/TaskCard/TaskCard';
import api from '../../utils/api';
import './WorkerDashboard.css';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await api.get('/user/profile');
        const u = resUser.data;
        setUser({
          firstName: u.firstName,
          walletBalance: u.walletBalance,
          createdAt: u.createdAt,
          attemptedTasks: u.attemptedTasks || []
        });
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      // Fetch all tasks
      try {
        const resTasks = await api.get('/admin/tasks'); // admin-protected endpoint
        setTasks(resTasks.data);
      } catch {
        setTasks([]);
      }

      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  const handleWithdrawal = () => {
    if (!user) return;

    const registrationDate = new Date(user.createdAt);
    const today = new Date();
    const diffDays = Math.floor(
      (today - registrationDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 15) {
      alert('You can only make withdrawal after the first 15 days to ensure consistency');
      return;
    }

    if (user.walletBalance < 200) {
      alert('Minimum withdrawal amount is $200');
      return;
    }

    navigate('/withdrawal');
  };

  const handleStartTask = (externalLink) => {
    window.open(externalLink, '_blank');
  };

  const handleTaskAttempt = async (taskId) => {
    try {
      await api.post('/user/attempt-task', { taskId });
      setUser((prev) => ({
        ...prev,
        attemptedTasks: [...(prev.attemptedTasks || []), taskId]
      }));
      alert('Task marked as attempted');
    } catch {
      alert('Could not mark task as attempted. Try again.');
    }
  };

  if (loading || !user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="worker-dashboard">
      <h1 className="welcome">Welcome, {user.firstName}!</h1>

      <div className="dashboard-section">
        <DashboardCard title="Wallet Balance" value={`$${user.walletBalance.toFixed(2)}`} />
        <button onClick={handleWithdrawal} className="withdraw-button">
          Withdraw
        </button>
      </div>

      <div className="tasks-section">
        <h2 className="section-title">Available Tasks</h2>
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStart={() => handleStartTask(task.externalLink)}
              onAttempt={() => handleTaskAttempt(task._id)}
              disabled={user.attemptedTasks.includes(task._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
