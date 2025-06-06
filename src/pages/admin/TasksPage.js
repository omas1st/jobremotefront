import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './TasksPage.css';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', payment: '', externalLink: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/admin/tasks');
        setTasks(res.data);
      } catch {
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/tasks', {
        title: form.title,
        description: form.description,
        payment: Number(form.payment),
        externalLink: form.externalLink,
      });
      setForm({ title: '', description: '', payment: '', externalLink: '' });
      const res = await api.get('/admin/tasks');
      setTasks(res.data);
    } catch {
      alert('Failed to add task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      alert('Failed to delete task');
    }
  };

  return (
    <div className="admin-page">
      <h2>Manage Tasks</h2>
      <form onSubmit={handleAdd} className="task-form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="payment"
          type="number"
          placeholder="Payment"
          value={form.payment}
          onChange={handleChange}
          required
        />
        <input
          name="externalLink"
          placeholder="External Link"
          value={form.externalLink}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t._id}>
            {t.title} — ${t.payment}
            <button onClick={() => handleDelete(t._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
