const db = require('../configs/db');

const Food = {
    getAllFoods: (callback) => {
        const sql = 'SELECT * FROM food_items';
        db.query(sql, callback);
    },

    getFoodById: (id, callback) => {
        const sql = 'SELECT * FROM food_items WHERE id = ?';
        db.query(sql, [id], callback);
    },

    addFood: (foodData, callback) => {
        const sql = 'INSERT INTO food_items (name, price, description, image_url) VALUES (?, ?, ?, ?)';
        db.query(sql, [foodData.name, foodData.price, foodData.description, foodData.image_url], callback);
    },

    updateFoodById: (id, foodData, callback) => {
        const sql = 'UPDATE food_items SET name = ?, price = ?, description = ?, image_url = ? WHERE id = ?';
        db.query(sql, [foodData.name, foodData.price, foodData.description, foodData.image_url, id], callback);
    },

    deleteFoodById: (id, callback) => {
        const sql = 'DELETE FROM food_items WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Food;
