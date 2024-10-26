import React, { useState } from "react";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    level: "",
    skills: [],
  });
  const [passwordStatus, setPasswordStatus] = useState("normal");
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === "checkbox") {
      setFormData((prevData) => {
        const skills = checked
          ? [...prevData.skills, value]
          : prevData.skills.filter((skill) => skill !== value);
        return { ...prevData, skills };
      });
    } else {
      setFormData({ ...formData, [name]: value });
  
      if (name === "password") {
        updatePasswordStatus(value);
      }
    }
  };
  const updatePasswordStatus = (password) => {
    if (!password) {
      setPasswordStatus("normal");
    } else if (password.length < 6) {
      setPasswordStatus("warning");
    } else if (password.length < 8) {
      setPasswordStatus("error");
    } else {
      setPasswordStatus("correct");
    }
  };
  const getPasswordClass = () => {
    switch (passwordStatus) {
      case "focus":
        return "focus";
      case "warning":
        return "warning";
      case "error":
        return "error";
      case "correct":
        return "correct";
      default:
        return "normal";
    }
  };
  const handlePasswordFocus = () => {
    setPasswordStatus("focus");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>FORM</h2>
        <div className="container">
          <div className="entryarea">
          <input
            type="text" required
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <div className="labelline">Username</div>
          <label htmlFor="username">
            <i className="fas fa-user"></i> 
          </label>
          </div>
        </div>
        <div className="container">
          <div className="entryarea">
          <input
            type="email" required
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <div className="labelline">E-mail
          </div>
          <label htmlFor="email">
            <i className="fas fa-envelope"></i>
          </label>
          </div>
        </div>
        <div className="container">
          <div className="entryarea">
          <input
            type="password" required
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onFocus={handlePasswordFocus}
            className={`input-field ${getPasswordClass()}`}
          />
          <div className="labelline">Password
          </div>
          <label htmlFor="password">
            <i className="fas fa-lock"></i>
          </label>
          </div>
          {passwordStatus === "warning" && (
            <div className="status-message warning">
              <p>Your password is little secure</p>
              <div className="strength-bar">
                <span className="low"></span>
              </div>
            </div>
          )}
          {passwordStatus === "error" && (
            <div className="status-message error">
              <p>Enter a valid password*</p>
              <div className="strength-bar">
                <span className="low"></span>
                <span className="medium"></span>
              </div>
            </div>
          )}
          {passwordStatus === "correct" && (
            <div className="status-message correct">
              <p>Password is secure</p>
              <div className="strength-bar">
                <span className="low"></span>
                <span className="medium"></span>
                <span className="high"></span>
              </div>
            </div>
          )}
        </div>
        <div className="container">
          <label htmlFor="country">
            <i className="fas fa-globe"></i> Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="">Select your country</option>
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="NZ">New Zealand</option>
            <option value="AUS">Australia</option>
          </select>
        </div>
        <div className="input-group">
          <label class="bold">Level of development</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="level"
                value="basic"
                checked={formData.level === "basic"}
                onChange={handleInputChange}
              />{" "}
              Basic
            </label>
            <label>
              <input
                type="radio"
                name="level"
                value="medium"
                checked={formData.level === "medium"}
                onChange={handleInputChange}
              />{" "}
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="level"
                value="advanced"
                checked={formData.level === "advanced"}
                onChange={handleInputChange}
              />{" "}
              Advanced
            </label>
          </div>
        </div>
        <div className="input-group">
          <label class="bold">Programming skills</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Java"
                checked={formData.skills.includes("Java")}
                onChange={handleInputChange}
              />{" "}
              Java
            </label>
            <label>
              <input
                type="checkbox"
                value="Python"
                checked={formData.skills.includes("Python")}
                onChange={handleInputChange}
              />{" "}
              Python
            </label>
            <label>
              <input
                type="checkbox"
                value="JavaScript"
                checked={formData.skills.includes("JavaScript")}
                onChange={handleInputChange}
              />{" "}
              JavaScript
            </label>
          </div>
        </div>
        <button type="submit" className="submit-button">
          SEND
        </button>
      </form>
    </div>
  );
};
export default App;