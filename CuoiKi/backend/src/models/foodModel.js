const db = require('../configs/db');

const Food = {
    // Lấy tất cả thực phẩm
    getAllFoods: (callback) => {
        const sql = 'SELECT * FROM food_items';
        db.query(sql, callback);
    },

    // Lấy thực phẩm theo ID
    getFoodById: (id, callback) => {
        const sql = 'SELECT * FROM food_items WHERE id = ?';
        db.query(sql, [id], callback);
    },

    // Thêm thực phẩm mới
    addFood: (foodData, callback) => {
        const sql = `INSERT INTO food_items 
                     (name, price, description, image_url, expiry_date, entry_date, quantity,supplier) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [
            foodData.name,
            foodData.price,
            foodData.description,
            foodData.image_url,
            foodData.expiry_date,
            foodData.entry_date,
            foodData.quantity,
            foodData.supplier,
        ], callback);
    },

    // Cập nhật thông tin thực phẩm theo ID
    updateFoodById: (id, foodData, callback) => {
        const sql = `UPDATE food_items 
                     SET name = ?, price = ?, description = ?, image_url = ?, expiry_date = ?, entry_date = ?, quantity = ? ,supplier = ?
                     WHERE id = ?`;
        db.query(sql, [
            foodData.name,
            foodData.price,
            foodData.description,
            foodData.image_url,
            foodData.expiry_date,
            foodData.entry_date,
            foodData.quantity,
            foodData.supplier,
            id
        ], callback);
    },

    // Xóa thực phẩm theo ID
    deleteFoodById: (id, callback) => {
        const sql = 'DELETE FROM food_items WHERE id = ?';
        db.query(sql, [id], callback);
    },

    // Kiểm tra xem thực phẩm đã tồn tại hay chưa
    checkFoodExists: (name, entry_date, expiry_date, callback) => {
        const sql = 'SELECT * FROM food_items WHERE name = ? AND entry_date = ? AND expiry_date = ?';
        db.query(sql, [name, entry_date, expiry_date], callback);
    }
};

module.exports = Food;
