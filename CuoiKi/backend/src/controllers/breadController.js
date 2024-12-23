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

        // Validate required fields
        if (!name || !price || !description || !image_url || !expiry_date || !entry_date || !quantity || !supplier) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate quantity
        if (quantity < 0) {
            return res.status(400).json({ message: 'Quantity cannot be negative' });
        }

        // Validate dates
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

        // Check if bread already exists
        bread.checkBreadExists(name, entry_date, expiry_date, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length > 0) {
                return res.status(400).json({ message: 'Bread already exists' });
            }

            // Add new bread
            bread.addBread(breadData, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });

                const insertedId = result.insertId; // Get the inserted ID
                bread.getBreadById(insertedId, (err, addedBread) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.status(201).json({ message: 'Bread added successfully', bread: addedBread[0] });
                });
            });
        });
    },

    updateBreadById: (req, res) => {
        const { id } = req.params;
        const breadData = req.body;

        bread.updateBreadById(id, breadData, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Bread not found' });

            bread.getBreadById(id, (err, updatedBread) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: 'Bread updated successfully', bread: updatedBread[0] });
            });
        });
    },

    deleteBreadById: (req, res) => {
        const { id } = req.params;

        // Get the bread details before deleting
        bread.getBreadById(id, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Bread not found' });

            const breadDetails = results[0]; // Save bread details
            bread.deleteBreadById(id, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: 'Bread deleted successfully', bread: breadDetails });
            });
        });
    },
};

module.exports = breadController;
