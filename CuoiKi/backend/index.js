const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const foodRoutes = require('./src/routes/foodRoutes');

const cors = require('cors');
const app = express();


// Apply CORS middleware first 
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api', foodRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
