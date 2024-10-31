const express = require('express');
const router = express.Router();

const db = require('../configs/database');


router.get('/', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.json(results);
    });
});


router.post('/', (req, res) => {
    const { title, description, due_date, completed } = req.body;
    const query = 'INSERT INTO todos (title, description, due_date, completed) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, due_date, completed || 0], (err, result) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.status(201).json({ id: result.insertId, title, description, due_date, completed });
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, completed } = req.body;
    const query = 'UPDATE todos SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?';
    db.query(query, [title, description, due_date, completed, id], (err) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send('Todo updated successfully');
    });
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM todos WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send('Todo deleted successfully');
    });
});

module.exports = router;
