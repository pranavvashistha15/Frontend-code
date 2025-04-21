import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import onboardingImage from "../../../assets/image1.png";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-frame">
        {/* Onboarding Section */}
        <div className="auth-onboarding">
          <div className="onboarding-background"></div>
          <div className="onboarding-content">
            <img
              src={onboardingImage}
              alt="Onboarding"
              className="onboarding-image"
            />
            <div className="onboarding-text">
              <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
              <p>
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam
              </p>
            </div>
            <div className="scroll-indicator">
              <span className="active"></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="auth-form-section">
          <div className="form-container">
            <h2>Welcome to Dashboard</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Email Address <span className="required">*</span>
                </label>
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
                <label>
                  Password <span className="required">*</span>
                </label>
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

              <div className="form-group">
                <label>
                  Confirm Password <span className="required">*</span>
                </label>
                <div className="password-input">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                  <button type="button" className="toggle-password">
                    👁️
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-button">
                Register
              </button>

              <p className="auth-switch">
                Already have an account?{" "}
                <button type="button" onClick={() => navigate("/login")}>
                  Login
                </button>
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

export default Register;