import React from 'react';
import './logoutPopup.css'; 
const LogoutPopup = ({ onCancel, onLogout }) => {
  return (
    <div className="logOutPopUp">
      <div className="rectangle55">
        <div className="rectangle56">
          <div className="logOut">Log Out</div>
        </div>
        <div className="confirmationText">
          Are you sure you want to log out?
        </div>
        <div className="buttonContainer">
          <button 
            className="cancelButton" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="logoutButton" 
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;