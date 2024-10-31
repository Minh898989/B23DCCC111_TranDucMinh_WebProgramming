const Users = require('../models/users.js');

exports.getAllUsers = (req, res) => {
    Users.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};


exports.createUser = (req, res) => {
    const { name, email, mobile, password } = req.body;
    Users.create(name, email, mobile, password, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created successfully' });
    });
};


exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, mobile } = req.body;
    Users.update(id, name, email, mobile, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'User updated successfully' });
    });
};


exports.deleteUser = (req, res) => {
    const { id } = req.params;
    Users.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'User deleted successfully' });
    });
};
