import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, value }) => {
  return (
    <div className="dashboard-card">
      <h3 className="card-title">{title}</h3>
      <p className="card-value">{value}</p>
    </div>
  );
};

export default DashboardCard;
