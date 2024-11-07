const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


exports.register = (req, res) => {
    const { username, password } = req.body;

    
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send(err);

        User.create(username, hash, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send('User registered');
        });
    });
};


exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).send('User not found');

        const user = results[0];

        
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) return res.status(500).send(err);
            if (!match) return res.status(401).send('Invalid password');

            
            const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
            res.json({ token });
        });
    });
};
