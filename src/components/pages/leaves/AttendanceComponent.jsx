import React, { useState } from 'react';

const AttendanceComponent = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Jane Cooper",
      position: "Full Time",
      department: "Designer",
      task: "Dashboard Home page Alignment",
      status: "Absent",
      initial: "J"
    },
    {
      id: 2,
      name: "Alex Johnson",
      position: "Part Time",
      department: "Developer",
      task: "API Integration",
      status: "Absent",
      initial: "A"
    },
    {
      id: 3,
      name: "Sarah Williams",
      position: "Full Time",
      department: "Marketing",
      task: "Campaign Analytics",
      status: "Absent",
      initial: "S"
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? {...emp, status: newStatus} : emp
    ));
  };

  return (
    <div className="attendance-container">
      <div className="header">
        <h2>Attendance</h2>
        <div className="controls">
          <select className="status-filter">
            <option>All Status</option>
            <option>Present</option>
            <option>Absent</option>
          </select>
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <span className="search-icon">🔍</span>
          </div>
          <div className="action-icons">
            <span className="notification">🔔</span>
            <span className="message">✉️</span>
            <span className="menu">⋮</span>
          </div>
        </div>
      </div>
      
      <div className="table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th className="first-column">Profile</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th className="last-column">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id} className={index === employees.length - 1 ? 'last-row' : ''}>
                <td className={`profile-cell ${index === employees.length - 1 ? 'bottom-left' : ''}`}>
                  <div className="avatar">{employee.initial}</div>
                </td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{employee.task}</td>
                <td className={index === employees.length - 1 ? 'bottom-right' : ''}>
                  <select 
                    className="status-select"
                    value={employee.status}
                    onChange={(e) => handleStatusChange(employee.id, e.target.value)}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style jsx>{`
        .attendance-container {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 0;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
          font-weight: 600;
        }
        
        .controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .status-filter {
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #ddd;
          outline: none;
          font-size: 0.9rem;
        }
        
        .search-box {
          position: relative;
        }
        
        .search-box input {
          padding: 8px 32px 8px 12px;
          border-radius: 6px;
          border: 1px solid #ddd;
          outline: none;
          font-size: 0.9rem;
        }
        
        .search-icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
        }
        
        .action-icons {
          display: flex;
          gap: 16px;
          font-size: 1.2rem;
        }
        
        .action-icons span {
          cursor: pointer;
          color: #555;
        }
        
        .notification {
          color: #e53935 !important;
        }
        
        .table-container {
          overflow: hidden;
          margin: 0 20px 20px;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
        }
        
        .attendance-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .attendance-table th, 
        .attendance-table td {
          padding: 14px 16px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
          border-right: 1px solid #e0e0e0;
        }
        
        .attendance-table th:last-child,
        .attendance-table td:last-child {
          border-right: none;
        }
        
        .last-row td {
          border-bottom: none;
        }
        
        .attendance-table th {
          background-color:rgb(88, 7, 102);
          color: white;
          font-weight: 500;
        }
        
        .first-column {
          border-top-left-radius: 12px;
        }
        
        .last-column {
          border-top-right-radius: 12px;
        }
        
        .bottom-left {
          border-bottom-left-radius: 12px;
        }
        
        .bottom-right {
          border-bottom-right-radius: 12px;
        }
        
        .attendance-table tr:nth-child(even) {
          background-color: #f9f4fb;
        }
        
        .profile-cell {
          text-align: center;
        }
        
        .avatar {
          width: 36px;
          height: 36px;
          background-color:rgb(103, 10, 119);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin: 0 auto;
        }
        
        .status-select {
          background-color: #f44336;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          border: none;
          font-size: 0.85rem;
          cursor: pointer;
          width: 90px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default AttendanceComponent;