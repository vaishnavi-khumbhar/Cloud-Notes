import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  // Direct Render backend URL
const API_BASE = process.env.REACT_APP_API_BASE;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting signup form:", credentials);

    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    const { name, email, password } = credentials;

    try {
      console.log("Calling API:", `${API_BASE}/api/auth/createuser`);

      const response = await fetch(`${API_BASE}/api/auth/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      console.log("HTTP Status:", response.status);

      const json = await response.json();
      console.log("Signup API Response:", json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Account created successfully", "success");
        navigate("/");
      } else {
        props.showAlert(json.error || "User already exists", "danger");
      }
    } catch (error) {
      console.error("Signup error:", error);
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
        style={{ width: "580px", borderRadius: "18px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Create Account ✨</h2>
          <p className="text-muted fs-6">
            Join CloudNote☁️ and keep your notes safe in the cloud.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-light">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your name"
                value={credentials.name}
                onChange={onChange}
                required
                minLength={3}
              />
            </div>
          </div>

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

          <div className="mb-3">
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

          <div className="mb-4">
            <label className="form-label fw-semibold">Confirm Password</label>
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-light">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                name="cpassword"
                placeholder="Confirm password"
                value={credentials.cpassword}
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-muted mt-4 mb-0 fs-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary fw-semibold">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
