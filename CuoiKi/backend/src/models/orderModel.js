const db = require('../configs/db');

const Order = {
    
    findOrderByPhoneNumber: (phoneNumber, callback) => {
        const query = 'SELECT * FROM orders WHERE phone_number = ?';
        db.query(query, [phoneNumber], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]); // Trả về kết quả đầu tiên nếu tồn tại
        });
    },

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
