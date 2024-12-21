// controllers/breadController.js
const bread = require('../models/breadModel');

const breadController = {
    getAllBreads: (req, res) => {
        bread.getAllBreads((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },

    getBreadById: (req, res) => {
        const { id } = req.params;
        bread.getBreadById(id, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Bread not found' });
            res.json(results[0]);
        });
    },

    addBread: (req, res) => {
        const breadData = req.body;
        const { name, price, description, image_url, expiry_date, entry_date, quantity, supplier } = breadData;

        if (!name || !price || !description || !image_url || !expiry_date || !entry_date || !quantity || !supplier) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (quantity < 0) {
            return res.status(400).json({ message: 'Quantity cannot be negative' });
        }

        const entryDate = new Date(entry_date);
        const expiryDate = new Date(expiry_date);
        const currentDate = new Date();

        if (isNaN(entryDate.getTime()) || isNaN(expiryDate.getTime())) {
            return res.status(400).json({ message: 'Invalid dates provided' });
        }
        if (entryDate > expiryDate) {
            return res.status(400).json({ message: 'Entry date must be before expiry date' });
        }
        if (entryDate > currentDate) {
            return res.status(400).json({ message: 'Entry date cannot be in the future' });
        }

        bread.checkBreadExists(name, entry_date, expiry_date, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length > 0) {
                return res.status(400).json({ message: 'Bread already exists' });
            }

            bread.addBread(breadData, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Bread added successfully', id: result.insertId });
            });
        });
    },

    updateBreadById: (req, res) => {
        const { id } = req.params;
        const breadData = req.body;

        bread.updateBreadById(id, breadData, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Bread not found' });
            res.json({ message: 'Bread updated successfully' });
        });
    },

    deleteBreadById: (req, res) => {
        const { id } = req.params;

        bread.deleteBreadById(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Bread not found' });
            res.json({ message: 'Bread deleted successfully' });
        });
    },
};

module.exports = breadController;
