import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          }
        });

        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Dashboard Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h3 className="text-muted">Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 p-4" style={{ borderRadius: "16px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Welcome, {user?.name} 👋</h2>
          <p className="text-muted mb-0">Here’s your account information</p>
        </div>

        <div className="row mt-3">
          <div className="col-md-6 mb-3">
            <div className="p-3 bg-light rounded border">
              <h6 className="text-secondary">Full Name</h6>
              <p className="fw-bold">{user?.name}</p>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="p-3 bg-light rounded border">
              <h6 className="text-secondary">Email Address</h6>
              <p className="fw-bold">{user?.email}</p>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="p-3 bg-light rounded border">
              <h6 className="text-secondary">Last Login</h6>
              <p className="fw-bold">
                {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"}
              </p>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="p-3 bg-light rounded border">
              <h6 className="text-secondary">Account Created</h6>
              <p className="fw-bold">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
