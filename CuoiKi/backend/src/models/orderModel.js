const db = require('../configs/db');

const Order = {
    createOrder: (orderData, callback) => {
        const { receiverName, phoneNumber, location, total, user_id } = orderData; // Thêm use_id

        const sql = `INSERT INTO orders (receiver_name, phone_number, location, total, user_id) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [receiverName, phoneNumber, location, total, user_id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    getAllOrders: (callback) => {
        const sql = `SELECT * FROM orders`;
        db.query(sql, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    findOrderByUserId: (use_id, callback) => {
        const query = 'SELECT * FROM users WHERE user_id= ?';
        db.query(query, [use_id], callback);
    },

    incrementPurchaseCountByUserId: (use_id, callback) => {
        const query = 'UPDATE orders SET purchase_count = purchase_count + 1 WHERE user_id = ?';
        db.query(query, [use_id], callback);
    },
    getOrdersByUserId: (userId, callback) => {
        const query = 'SELECT * FROM orders WHERE user_id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
};

module.exports = Order;
