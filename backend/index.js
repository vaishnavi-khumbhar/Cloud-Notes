require('dotenv').config();
const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

//  Connect to MongoDB
connectToMongo();

const app = express();  
const port = 5000; 

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Test route
app.get('/ping', (req, res) => {
  res.send(" Server is running");
});

// Start server
app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
