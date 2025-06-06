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

  // Fetch user profile from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/user/profile');
        // res.data contains user object, minus password
        setUser({
          firstName: res.data.firstName,
          walletBalance: res.data.walletBalance,
          createdAt: res.data.createdAt,
          attemptedTasks: res.data.attemptedTasks || []
        });
      } catch (err) {
        console.error('Error fetching user profile:', err);
        // If token expired or invalid, redirect to login:
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      // (Optional) You could fetch tasks from the backend too—here we simulate static tasks:
      setTasks([
        {
          id: '1',
          title: 'Data Entry',
          description: 'Simple data entry task',
          payment: 5.0,
          externalLink: 'https://example.com/task1'
        },
        {
          id: '2',
          title: 'Survey',
          description: 'Complete a short survey',
          payment: 2.5,
          externalLink: 'https://example.com/task2'
        }
      ]);

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
      // Update local copy of attemptedTasks
      setUser((prev) => ({
        ...prev,
        attemptedTasks: [...(prev.attemptedTasks || []), taskId]
      }));
      alert('Task marked as attempted');
    } catch (err) {
      console.error('Error attempting task:', err);
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
              key={task.id}
              task={task}
              onStart={() => handleStartTask(task.externalLink)}
              onAttempt={() => handleTaskAttempt(task.id)}
              disabled={user.attemptedTasks.includes(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
