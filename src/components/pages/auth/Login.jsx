import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import onboardingImage from "../../../assets/image1.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      console.log('Login successful:', data);
      localStorage.setItem('token', data.accessToken);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-frame">
        {/* Onboarding Section */}
        <div className="auth-onboarding">
          <div className="onboarding-background"></div>
          <div className="onboarding-content">
            <img src={onboardingImage} alt="Onboarding" className="onboarding-image" />
            <div className="onboarding-text">
              <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
              <p>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
            <div className="scroll-indicator">
              <span className="active"></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="auth-form-section">
          <div className="form-container">
            <h2>Welcome to Dashboard</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password <span className="required">*</span></label>
                <div className="password-input">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  <button type="button" className="toggle-password">
                    👁️
                  </button>
                </div>
              </div>

              <div className="forgot-password">
                <button type="button" onClick={() => navigate('/forgot-password')}>
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="auth-button">
                Login
              </button>

              <p className="auth-switch">
                Don't have an account? <button type="button" onClick={() => navigate('/register')}>Register</button>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="auth-logo">
        <div className="logo-box"></div>
        <span>LOGO</span>
      </div>
    </div>
  );
};

export default Login;