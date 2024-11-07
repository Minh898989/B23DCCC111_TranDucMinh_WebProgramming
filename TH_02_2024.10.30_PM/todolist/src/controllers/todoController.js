const Todo = require('../models/todoModels');

exports.getAllTodos = (req, res) => {
    Todo.getAll((err, tasks) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(tasks);
    });
};

exports.addTodo = (req, res) => {
    const newTask = req.body;
    Todo.add(newTask, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...newTask });
    });
};

exports.updateTodo = (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    Todo.update(taskId, updatedTask, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Task updated successfully' });
    });
};

exports.deleteTodo = (req, res) => {
    const taskId = req.params.id;
    Todo.delete(taskId, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Task deleted successfully' });
    });
};