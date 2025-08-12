import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from "./components/Dashboard";
import Footer from './components/Footer';

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

// Move this line here (after imports, before component)
defineElement(lottie.loadAnimation);

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <NoteState>
      {/* Set basename to your GitHub repo name for correct routing */}
      <Router basename="/Cloud-Notes">
        {/* Flex container for full height layout */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Alert alert={alert} />
          <div className="container" style={{ flex: 1 }}>
            <Routes>
              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home showAlert={showAlert} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <PrivateRoute>
                    <About />
                  </PrivateRoute>
                }
              />

              {/* Public Routes */}
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
