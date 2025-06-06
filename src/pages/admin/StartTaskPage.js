import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import './StartTaskPage.css';

const StartTaskPage = () => {
  const [tasks, setTasks] = useState([]);

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

  const handleChangeUrl = async (id, url) => {
    try {
      await api.post(`/admin/tasks/${id}`, { externalLink: url });
      alert('URL updated');
    } catch {
      alert('Failed to update URL');
    }
  };

  return (
    <div className="admin-page">
      <h2>Change Task Redirect URLs</h2>
      {tasks.map((t) => (
        <div key={t._id} className="url-slot">
          <span>{t.title}</span>
          <input
            defaultValue={t.externalLink}
            onBlur={(e) => handleChangeUrl(t._id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default StartTaskPage;
