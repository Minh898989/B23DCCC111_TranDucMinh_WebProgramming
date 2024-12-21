const db = require('../configs/db');

const noodles = {
    // Lấy tất cả thực phẩm
    getAllNoodless: (callback) => {
        const sql = 'SELECT * FROM noodles';
        db.query(sql, callback);
    },

    // Lấy thực phẩm theo ID
    getNoodlesById: (id, callback) => {
        const sql = 'SELECT * FROM Noodles WHERE id = ?';
        db.query(sql, [id], callback);
    },

    // Thêm thực phẩm mới
    addNoodles: (foodData, callback) => {
        const sql = `INSERT INTO noodles 
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
    updateNoodlesById: (id, foodData, callback) => {
        const sql = `UPDATE noodles
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
    deleteNoodlesById: (id, callback) => {
        const sql = 'DELETE FROM noodles WHERE id = ?';
        db.query(sql, [id], callback);
    },

    // Kiểm tra xem thực phẩm đã tồn tại hay chưa
    checkNoodlesExists: (name, entry_date, expiry_date, callback) => {
        const sql = 'SELECT * FROM noodles WHERE name = ? AND entry_date = ? AND expiry_date = ?';
        db.query(sql, [name, entry_date, expiry_date], callback);
    }
};

module.exports = noodles;
