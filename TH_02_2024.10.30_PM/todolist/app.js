
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./src/routes/todoRouter');
const userRoutes = require('./src/routes/userRouter');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


app.use('/todos', todoRoutes);
app.use('/users', userRoutes);
 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
