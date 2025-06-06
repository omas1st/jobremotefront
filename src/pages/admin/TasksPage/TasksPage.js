import React, { useState, useEffect } from 'react';
import './TasksPage.css';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    payment: 0,
    externalLink: '',
    dueDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setTasks([
            { id: 1, title: 'Data Entry', description: 'Simple data entry task', payment: 5.00, externalLink: 'https://example.com/task1' },
            { id: 2, title: 'Survey', description: 'Complete a short survey', payment: 2.50, externalLink: 'https://example.com/task2' }
          ]);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: name === 'payment' ? parseFloat(value) || 0 : value
    });
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description || !newTask.externalLink) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Simulate API call
      setTimeout(() => {
        setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
        setNewTask({
          title: '',
          description: '',
          payment: 0,
          externalLink: '',
          dueDate: ''
        });
        setError('');
      }, 500);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleDeleteTask = (taskId) => {
    try {
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="admin-tasks-page">
      <h1 className="page-title">Manage Tasks</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="add-task-form">
        <h2 className="form-title">Add New Task</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label>Payment ($)</label>
          <input
            type="number"
            name="payment"
            value={newTask.payment}
            onChange={handleInputChange}
            className="form-input"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>External Link</label>
          <input
            type="text"
            name="externalLink"
            value={newTask.externalLink}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Due Date (Optional)</label>
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <button onClick={handleAddTask} className="add-button">
          Add Task
        </button>
      </div>
      
      <div className="tasks-list">
        <h2 className="list-title">Current Tasks</h2>
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>${task.payment.toFixed(2)}</td>
                <td>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksPage;