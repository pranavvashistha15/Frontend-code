import React, { useState } from 'react';
import './Auth.css';
import onboardingImage from "../../../../assets/image1.png";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login submitted:', {
        email: formData.email,
        password: formData.password
      });
    } else {
      console.log('Register submitted:', formData);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-frame">
        {/* Onboarding Section (Same for both) */}
        <div className="auth-onboarding">
          <div className="onboarding-background"></div>
          <div className="onboarding-content">
            <img src={onboardingImage} alt="Onboarding" />
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

        {/* Dynamic Form Section */}
        <div className="auth-form-section">
          <div className="form-container">
            <h2>Welcome to Dashboard</h2>
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label>Full Name <span>*</span></label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email Address <span>*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password <span>*</span></label>
                <div className="password-input">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="toggle-password">
                    👁️
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label>Confirm Password <span>*</span></label>
                  <div className="password-input">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button type="button" className="toggle-password">
                      👁️
                    </button>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="forgot-password">
                  <a href="/forgot-password">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="auth-button">
                {isLogin ? 'Login' : 'Register'}
              </button>

              <p className="auth-switch">
                {isLogin ? (
                  <>Don't have an account? <button type="button" onClick={() => setIsLogin(false)}>Register</button></>
                ) : (
                  <>Already have an account? <button type="button" onClick={() => setIsLogin(true)}>Login</button></>
                )}
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

export default AuthForm;