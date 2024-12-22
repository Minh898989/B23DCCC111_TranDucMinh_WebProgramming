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
};

module.exports = Order;
