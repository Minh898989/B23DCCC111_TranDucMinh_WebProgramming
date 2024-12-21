const db = require('../configs/db');

const dessertModel = {
    getAllDesserts: (callback) => {
        db.query('SELECT * FROM desserts', callback);
    },

    getDessertById: (id, callback) => {
        db.query('SELECT * FROM desserts WHERE id = ?', [id], callback);
    },

    checkDessertExists: (name, entry_date, expiry_date, callback) => {
        db.query(
            'SELECT * FROM desserts WHERE name = ? AND entry_date = ? AND expiry_date = ?',
            [name, entry_date, expiry_date],
            callback
        );
    },

    addDessert: (dessertData, callback) => {
        const { name, price, description, image_url, expiry_date, entry_date, quantity, supplier } = dessertData;
        db.query(
            'INSERT INTO desserts (name, price, description, image_url, expiry_date, entry_date, quantity, supplier) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, price, description, image_url, expiry_date, entry_date, quantity, supplier],
            callback
        );
    },

    updateDessertById: (id, dessertData, callback) => {
        const { name, price, description, image_url, expiry_date, entry_date, quantity, supplier } = dessertData;
        db.query(
            'UPDATE desserts SET name = ?, price = ?, description = ?, image_url = ?, expiry_date = ?, entry_date = ?, quantity = ?, supplier = ? WHERE id = ?',
            [name, price, description, image_url, expiry_date, entry_date, quantity, supplier, id],
            callback
        );
    },

    deleteDessertById: (id, callback) => {
        db.query('DELETE FROM desserts WHERE id = ?', [id], callback);
    },
};

module.exports = dessertModel;
