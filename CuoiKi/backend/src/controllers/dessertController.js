const dessert = require('../models/dessertModel');

const dessertController = {
    getAllDesserts: (req, res) => {
        dessert.getAllDesserts((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },

    getDessertById: (req, res) => {
        const { id } = req.params;
        dessert.getDessertById(id, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Dessert không tồn tại' });
            res.json(results[0]);
        });
    },

    addDessert: (req, res) => {
        const dessertData = req.body;
        const { name, price, description, image_url, expiry_date, entry_date, quantity, supplier } = dessertData;

        if (!name || !price || !description || !image_url || !expiry_date || !entry_date || !quantity || !supplier) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
        }

        if (quantity < 0) {
            return res.status(400).json({ message: 'Số lượng không thể âm' });
        }

        const entryDate = new Date(entry_date);
        const expiryDate = new Date(expiry_date);
        const currentDate = new Date();

        if (isNaN(entryDate.getTime()) || isNaN(expiryDate.getTime())) {
            return res.status(400).json({ message: 'Ngày không hợp lệ' });
        }
        if (entryDate > expiryDate) {
            return res.status(400).json({ message: 'Ngày nhập phải trước ngày hết hạn' });
        }
        if (entryDate > currentDate) {
            return res.status(400).json({ message: 'Ngày nhập không được trong tương lai' });
        }

        dessert.checkDessertExists(name, entry_date, expiry_date, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length > 0) {
                return res.status(400).json({ message: 'Món tráng miệng đã tồn tại' });
            }

            dessert.addDessert(dessertData, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Thêm thành công', id: result.insertId });
            });
        });
    },

    updateDessertById: (req, res) => {
        const { id } = req.params;
        const dessertData = req.body;

        dessert.updateDessertById(id, dessertData, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Dessert không tồn tại' });
            res.json({ message: 'Cập nhật thành công' });
        });
    },

    deleteDessertById: (req, res) => {
        const { id } = req.params;

        dessert.deleteDessertById(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Dessert không tồn tại' });
            res.json({ message: 'Xóa thành công' });
        });
    },
};

module.exports = dessertController;
