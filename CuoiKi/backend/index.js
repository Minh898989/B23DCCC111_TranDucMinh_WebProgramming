const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const foodRoutes = require('./src/routes/foodRoutes');
const drinkRoutes = require('./src/routes/drinkRoutes');
const noodlesRoutes = require('./src/routes/noodlesRoutes');
const breadRoutes = require('./src/routes/breadRoutes');
const dessertRoutes = require('./src/routes/dessertRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const { initializeManagerAccount } = require('./src/controllers/userController');

const cors = require('cors');
const app = express();


// Apply CORS middleware first 
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api', foodRoutes);
app.use('/api', drinkRoutes);
app.use('/api', noodlesRoutes);
app.use('/api', breadRoutes);
app.use('/api', dessertRoutes);
app.use('/api', orderRoutes);

initializeManagerAccount();
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
