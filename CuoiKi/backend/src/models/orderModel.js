const db = require('../configs/db');

const Order = {
    
    
    createOrder: (orderData, callback) => {
        const { receiverName, phoneNumber, location, total } = orderData;

        const sql = `INSERT INTO orders (receiver_name, phone_number, location, total) VALUES (?, ?, ?, ?)`;
        db.query(sql, [receiverName, phoneNumber, location, total], (err, results) => {
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
    incrementPurchaseCount: (phoneNumber, callback) => {
        const sql = `UPDATE orders SET purchase_count = purchase_count + 1 WHERE phone_number = ?`;
        db.query(sql, [phoneNumber], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    findOrderByPhoneNumber: (phoneNumber, callback) => {
        const sql = `SELECT * FROM orders WHERE phone_number = ? ORDER BY id DESC LIMIT 1`;
        db.query(sql, [phoneNumber], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

};


module.exports = Order;