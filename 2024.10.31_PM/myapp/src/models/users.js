const db = require('../configs/db');

const Users = {
    
    getAll: (callback) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

 
    create: (name, email, mobile, password, callback) => {
        const hashedPassword = password; 
        db.query(
            'INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)',
            [name, email, mobile, hashedPassword],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result);
            }
        );
    },

    update: (id, name, email, mobile, callback) => {
        db.query(
            'UPDATE users SET name = ?, email = ?, mobile = ? WHERE id = ?',
            [name, email, mobile, id],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result);
            }
        );
    },

    
    delete: (id, callback) => {
        db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = Users;
