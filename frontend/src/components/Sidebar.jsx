import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

export function Sidebar({ isOpen, toggleSidebar, role }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <ul>
        {role=="admin"?<li><Link to="/adminhome" onClick={toggleSidebar}>Home</Link></li>:
        <li><Link to="/home" onClick={toggleSidebar}>Home</Link></li>}
        <li><Link to="/cmnpLab" onClick={toggleSidebar}>About</Link></li>
        <li><Link to="/contact" onClick={toggleSidebar}>Contact</Link></li>
      </ul>
    </div>
  );
};