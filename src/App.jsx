import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import "./App.css";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Candidates from "./components/pages/candidates/Candidates";
import Employees from "./components/pages/employees/Employees";
import Attendance from "./components/pages/attendance/Attendance";
import Leaves from "./components/pages/leaves/Leaves";
import LogoutPopup from "./components/pages/logout/logoutPopup";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("Candidates");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, redirecting to login.");
      return <Navigate to="/login" />;
    }else {
      console.log("Token found, setting authentication state.");
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogoutPopup(false);
    return <Navigate to="/login" />;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const renderComponent = () => {
    switch (activeTab) {
      case "Candidates":
        return <Candidates />;
      case "Employees":
        return <Employees />;
      case "Attendance":
        return <Attendance />;
      case "Leaves":
        return <Leaves />;
      default:
        return <Navigate to="/login" />;
    }
  };

  const ProtectedLayout = () => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="app-layout">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogoutClick={() => setShowLogoutPopup(true)}
        />
        <main className="main-content">{renderComponent()}</main>
        
        {showLogoutPopup && (
          <LogoutPopup
            onCancel={() => setShowLogoutPopup(false)}
            onLogout={handleLogout}
          />
        )}
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<ProtectedLayout />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;