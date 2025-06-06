import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onStart, onAttempt, disabled }) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <p className="task-payment">Payment: ${task.payment || task.amount}</p>
      <button 
        onClick={onStart} 
        className="start-button"
        disabled={disabled}
      >
        {disabled ? 'Started' : 'Start Task'}
      </button>
      <button 
        onClick={onAttempt} 
        className="attempt-button"
        disabled={disabled}
      >
        {disabled ? 'Completed' : 'Task Attempted'}
      </button>
      <p className="task-note">Click "Task Attempted" after completing the task</p>
    </div>
  );
};

export default TaskCard;
