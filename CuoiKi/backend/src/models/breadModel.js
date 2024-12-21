// models/breadModel.js
const db = require('../configs/db'); // Tập tin cấu hình kết nối database

const breadModel = {
    getAllBreads: (callback) => {
        db.query('SELECT * FROM breads', callback);
    },

    getBreadById: (id, callback) => {
        db.query('SELECT * FROM breads WHERE id = ?', [id], callback);
    },

    checkBreadExists: (name, entryDate, expiryDate, callback) => {
        const query = 'SELECT * FROM breads WHERE name = ? AND entry_date = ? AND expiry_date = ?';
        db.query(query, [name, entryDate, expiryDate], callback);
    },

    addBread: (breadData, callback) => {
        const query = 'INSERT INTO breads (name, price, description, image_url, expiry_date, entry_date, quantity, supplier) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [breadData.name, breadData.price, breadData.description, breadData.image_url, breadData.expiry_date, breadData.entry_date, breadData.quantity, breadData.supplier];
        db.query(query, values, callback);
    },

    updateBreadById: (id, breadData, callback) => {
        const query = 'UPDATE breads SET name = ?, price = ?, description = ?, image_url = ?, expiry_date = ?, entry_date = ?, quantity = ?, supplier = ? WHERE id = ?';
        const values = [breadData.name, breadData.price, breadData.description, breadData.image_url, breadData.expiry_date, breadData.entry_date, breadData.quantity, breadData.supplier, id];
        db.query(query, values, callback);
    },

    deleteBreadById: (id, callback) => {
        db.query('DELETE FROM breads WHERE id = ?', [id], callback);
    },
};

module.exports = breadModel;
