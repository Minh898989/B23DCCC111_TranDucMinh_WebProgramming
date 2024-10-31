const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./src/routes/usersRouter');

const app = express();
const port = 3000;

app.use(bodyParser.json()); 
app.use('/api', usersRoutes); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
