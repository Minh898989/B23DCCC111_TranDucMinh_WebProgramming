const db = require('../configs/db');

const createUser = (name, email, password, callback) => {
    const query = 'INSERT INTO users (name, email, password, is_verified) VALUES (?, ?, ?, FALSE)';
    db.query(query, [name, email, password], callback);
};

const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
};


const findUserByName = (name, callback) => {
    const query = 'SELECT * FROM users WHERE name = ?';
    db.query(query, [name], callback);
};



module.exports = { createUser, findUserByEmail,findUserByName };
