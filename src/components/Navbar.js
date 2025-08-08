import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaDownload, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import noteContext from "../context/notes/noteContext";

const Navbar = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes } = context;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  const handleDownload = () => {
    if (!notes || notes.length === 0) {
      alert("❌ No notes to download!");
      return;
    }

    let content = "📒 Your Cloud Notes☁️ 📒\n\n";
    notes.forEach((note, index) => {
      content += `📝 Note ${index + 1}\n`;
      content += `Title      : ${note.title}\n`;
      content += `Description: ${note.description}\n`;
      content += `Tag        : ${note.tag}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = "iNotebook_Notes.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Nunito:wght@500&display=swap" rel="stylesheet" />

      <nav style={styles.navbar}>
        <div style={styles.navInner}>

          {/* Logo & Branding */}
          <Link to="/" style={styles.logoContainer}>
            <FaBook size={36} style={styles.logoIcon} />
            <span style={styles.brandText}>CloudNotes☁️</span>
          </Link>

          {/* Right Buttons */}
          <div style={styles.buttonsContainer}>
            {localStorage.getItem('token') ? (
              <>
                <button onClick={handleDownload} style={{ ...styles.button, ...styles.download }}>
                  <FaDownload className="me-2" /> download
                </button>
                <Link to="/dashboard" style={{ ...styles.button, ...styles.dashboard }}>dashboard</Link>
                <button onClick={handleLogout} style={{ ...styles.button, ...styles.logout }}>
                  <FaSignOutAlt className="me-2" /> logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ ...styles.button, ...styles.login }}>
                  <FaSignInAlt className="me-2" /> login
                </Link>
                <Link to="/signup" style={{ ...styles.button, ...styles.signup }}>
                  <FaUserPlus className="me-2" /> signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'linear-gradient(120deg, #1f1c2c, #928DAB)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '20px 40px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    fontFamily: "'Nunito', sans-serif",
  },
  navInner: {
    maxWidth: '1300px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff',
    gap: '8px'
  },
  logoIcon: {
    color: '#fff'
  },
  brandText: {
    fontFamily: "'Pacifico', cursive",
    fontSize: '2rem',
    color: '#fff'
  },
  buttonsContainer: {
    display: 'flex',
    gap: '12px'
  },
  button: {
    padding: '8px 18px',
    borderRadius: '25px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  download: {
    background: '#22c55e',
  },
  dashboard: {
    background: '#3b82f6',
  },
  logout: {
    background: '#ef4444',
  },
  login: {
    background: '#3b82f6',
  },
  signup: {
    background: '#6366f1',
  },
};

export default Navbar;
