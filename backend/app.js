// server.js
const express = require('express');
const cors = require('cors');
const conn = require('./utilise/conn');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes'); 


// App config
const app = express();


//  Connect to DB at startup
conn();
const allowedOrigins = [
  'https://ticketbooking-frontend.onrender.com',
  'http://localhost:5000' // Optional: for development testing
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());



//  route 
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);


const PORT = 5000;
// Start server
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});










