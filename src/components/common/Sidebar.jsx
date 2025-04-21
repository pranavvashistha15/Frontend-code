import React, { useState } from "react";
import {
  FiUsers,
  FiUser,
  FiBarChart2,
  FiCalendar,
  FiLogOut,
  FiMenu,
  FiSearch,
} from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = ({ activeTab, setActiveTab, onLogoutClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    {
      title: "Recruitment",
      tabs: [{ label: "Candidates", icon: <FiUsers /> }],
    },
    {
      title: "Organization",
      tabs: [
        { label: "Employees", icon: <FiUser /> },
        { label: "Attendance", icon: <FiBarChart2 /> },
        { label: "Leaves", icon: <FiCalendar /> },
      ],
    },
    {
      title: "Others",
      tabs: [{ label: "Logout", icon: <FiLogOut />, logout: true }],
    },
  ];

  const handleTabClick = (label, isLogout) => {
    if (isLogout) {
      onLogoutClick();
    } else {
      setActiveTab(label);
    }
    setIsOpen(false);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo-container">
        <div className="logo-icon"></div>
        <span className="logo-text">LOGO</span>
      </div>

      {
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input placeholder="Search" />
        </div>
      }

      {sections.map((section) => (
        <div key={section.title} className="section-container">
          <p className="section-title">{section.title}</p>
          <ul>
            {section.tabs.map(({ label, icon, logout }) => (
              <li
                key={label}
                className={`sidebar-item ${
                  label === activeTab ? "active" : ""
                } ${logout ? "logout" : ""}`}
                onClick={() => handleTabClick(label, logout)}
              >
                <span className="icon">{icon}</span>
                <span className="label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;