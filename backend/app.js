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
app.use(cors());
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






