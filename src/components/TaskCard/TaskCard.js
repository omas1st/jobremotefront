import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onStart, onAttempt }) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <p className="task-payment">Payment: ${task.payment}</p>
      <button onClick={onStart} className="start-button">Start Task</button>
      <button onClick={onAttempt} className="attempt-button">Task Attempted</button>
      <p className="task-note">Click "Task Attempted" after completing the task</p>
    </div>
  );
};

export default TaskCard;