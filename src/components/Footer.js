import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(to right, #111111ff, #4c4b50ff)",
        color: "#fff",
        padding: "15px 0",
        marginTop: "auto", // Flex container मध्ये खाली ठेवण्यासाठी
        width: "100%",
        textAlign: "center",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <div className="container">
        <p style={{ margin: 0, fontSize: '16px' }}>
          © {new Date().getFullYear()} CloudNotes ☁️. All rights reserved.
        </p>
        <div style={{ marginTop: '8px' }}>
         
          <a
            href="https://github.com/vaishnavi-khumbhar"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vaishnavi-kumbhar-629752242/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
