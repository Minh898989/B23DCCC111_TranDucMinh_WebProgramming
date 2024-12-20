const db = require('../configs/db');

const drink = {
    getAllDrinks: (callback) => {
        const sql = 'SELECT * FROM drinks';
        db.query(sql, callback);
    },
    getDrinkById: (id, callback) => {
        const sql = 'SELECT * FROM drinks WHERE id = ?';
        db.query(sql, [id], callback);
    },
    addDrink: (drinkData, callback) => {
        const sql = `INSERT INTO drinks
                     (name, price, description, image_url, expiry_date, entry_date, quantity, supplier) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [
            drinkData.name,
            drinkData.price,
            drinkData.description,
            drinkData.image_url,
            drinkData.expiry_date,
            drinkData.entry_date,
            drinkData.quantity,
            drinkData.supplier,
        ], callback);
    },
    updateDrinkById: (id, drinkData, callback) => {
        const sql = `UPDATE drinks 
                     SET name = ?, price = ?, description = ?, image_url = ?, expiry_date = ?, entry_date = ?, quantity = ?, supplier = ?
                     WHERE id = ?`;
        db.query(sql, [
            drinkData.name,
            drinkData.price,
            drinkData.description,
            drinkData.image_url,
            drinkData.expiry_date,
            drinkData.entry_date,
            drinkData.quantity,
            drinkData.supplier,
            id,
        ], callback);
    },
    deleteDrinkById: (id, callback) => {
        const sql = 'DELETE FROM drinks WHERE id = ?';
        db.query(sql, [id], callback);
    },
    checkDrinkExists: (name, entry_date, expiry_date, callback) => {
        const sql = 'SELECT * FROM drinks WHERE name = ? AND entry_date = ? AND expiry_date = ?';
        db.query(sql, [name, entry_date, expiry_date], callback);
    },
};

module.exports = drink;
