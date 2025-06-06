import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import './TaskApprovalsPage.css';

const TaskApprovalsPage = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/admin/users')
      .then(res => setUsers(res.data))
      .catch(() => setStatus('Error loading users'));
  }, []);

  const handleApprove = async (userId, task) => {
    try {
      await api.post('/admin/approve-task', {
        userId,
        amount: task.payment
      });
      setStatus(`Approved $${task.payment} for ${task.title}`);
      // reflect in UI
      setUsers(u => u.map(x => {
        if (x._id !== userId) return x;
        return { 
          ...x, 
          walletBalance: x.walletBalance + task.payment,
          attemptedTasks: x.attemptedTasks.filter(id => id !== task._id)
        };
      }));
    } catch (err) {
      setStatus('Error approving task');
    }
  };

  return (
    <div className="task-approvals-page">
      <h1>Task Payment Approvals</h1>
      {status && <p className="status">{status}</p>}
      {users.map(u => (
        <div key={u._id} className="user-block">
          <h2>{u.firstName} {u.lastName} (${u.walletBalance.toFixed(2)})</h2>
          {u.attemptedTasks.length ? (
            u.attemptedTasks.map(task => (
              <div key={task._id || task} className="task-row">
                <span>{task.title || task}</span>
                <button onClick={() => handleApprove(u._id, task)}>
                  Approve ${task.payment || '…'}
                </button>
              </div>
            ))
          ) : (
            <p>No pending tasks</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskApprovalsPage;
