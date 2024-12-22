const db = require('../configs/db');

const OrderItem = {
    createOrderItem: (orderItemData, callback) => {
        const { orderId, productName, soluong, price,image_url} = orderItemData;

        const sql = `INSERT INTO order_items (order_id, product_name, soluong, price,image_url) VALUES (?, ?, ?, ?,?)`;
        db.query(sql, [orderId, productName, soluong, price,image_url], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = OrderItem;
