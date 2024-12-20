const drink = require('../models/drinkModel');

const drinkController = {
    getAllDrinks: (req, res) => {
        drink.getAllDrinks((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },
    getDrinkById: (req, res) => {
        const { id } = req.params;
        drink.getDrinkById(id, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Drink not found' });
            res.json(results[0]);
        });
    },
    addDrink: (req, res) => {
        const drinkData = req.body;
        const { name, price, description, image_url, expiry_date, entry_date, quantity, supplier } = drinkData;

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

        drink.checkDrinkExists(name, entry_date, expiry_date, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length > 0) {
                return res.status(400).json({ message: 'Drink already exists' });
            }

            drink.addDrink(drinkData, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Drink added successfully', id: result.insertId });
            });
        });
    },
    updateDrinkById: (req, res) => {
        const { id } = req.params;
        const drinkData = req.body;

        drink.updateDrinkById(id, drinkData, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Drink not found' });
            res.json({ message: 'Drink updated successfully' });
        });
    },
    deleteDrinkById: (req, res) => {
        const { id } = req.params;

        drink.deleteDrinkById(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Drink not found' });
            res.json({ message: 'Drink deleted successfully' });
        });
    },
};

module.exports = drinkController;
