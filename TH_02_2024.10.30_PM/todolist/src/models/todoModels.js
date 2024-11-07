const db = require('../configs/db');

const Todo = {
    getAll: (callback) => {
        db.query('SELECT * FROM tasks', (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        });
    },

    add: (task, callback) => {
        db.query('INSERT INTO tasks SET ?', task, (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        });
    },

    update: (id, task, callback) => {
        db.query('UPDATE tasks SET ? WHERE id = ?', [task, id], (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        db.query('DELETE FROM tasks WHERE id = ?', [id], (error, results) => {
            if (error) return callback(error);
            callback(null, results);
        });
    }
};

module.exports = Todo;