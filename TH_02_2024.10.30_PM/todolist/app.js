// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./src/routes/todoRouter');
const userRoutes = require('./src/routes/userRouter');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
