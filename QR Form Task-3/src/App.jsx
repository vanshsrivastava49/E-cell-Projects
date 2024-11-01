import React, { useState } from "react";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import QRCode from 'qrcode';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    regno:"",
    dept:"",
    year:"",
  });
  const [passwordStatus, setPasswordStatus] = useState("normal");
  const [qrCodeURL, setQrCodeURL] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.stringify(formData);
      const url = await QRCode.toDataURL(data);
      console.log("Form Data Submitted:", formData);
      setQrCodeURL(url);
    } catch (error) {
      console.error("Error generating QR code:", error);
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

  return (
    <ErrorBoundary>
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
              <div className="labelline">E-mail</div>
              <label htmlFor="email">
                <i className="fas fa-envelope"></i>
              </label>
            </div>
          </div>
          <div className="container">
            <div className="entryarea">
              <input
                type="text" required
                id="regno"
                name="regno"
                value={formData.regno}
                onChange={handleInputChange}
              />
              <div className="labelline">Registration No.</div>
        
            </div>
          </div>
          <div className="container">
            <div className="entryarea">
              <input
                type="text" required
                id="dept"
                name="dept"
                value={formData.dept}
                onChange={handleInputChange}
              />
              <div className="labelline">Department</div>
              
            </div>
          </div>
          <div className="container">
            <div className="entryarea">
              <input
                type="text" required
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
              />
              <div className="labelline">Year</div>
              
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
         
          <button type="submit" className="submit-button">
            SUBMIT
          </button>
        </form>
        {}
        {qrCodeURL && (
          <div className="qr-code-container">
            <h3>Details saved Successfully!!</h3>
            <h4>QR Code:</h4>
            <img src={qrCodeURL} alt="QR Code" className="qr-code" />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
