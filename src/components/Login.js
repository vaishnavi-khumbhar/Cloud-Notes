import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

const API_BASE = process.env.REACT_APP_API_BASE;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log("Login API Response:", json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Logged in successfully", "success");
      } else {
        props.showAlert(json.error || "Invalid credentials", "danger");
      }
    } catch (error) {
      props.showAlert("Server error. Please try again later.", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f8ff",
        paddingTop: "80px",
        paddingBottom: "80px",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{ width: "480px", borderRadius: "18px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Welcome Back 👋</h2>
          <p className="text-muted fs-6">
            Login to access your secure CloudNotes☁️ account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-light">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-light">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={onChange}
                required
                minLength={5}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fs-5 fw-bold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-muted mt-4 mb-0 fs-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-primary fw-bold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
