const Food = require('../models/foodModel');

const foodController = {
    // Lấy tất cả thực phẩm
    getAllFoods: (req, res) => {
        Food.getAllFoods((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },

    // Lấy thực phẩm theo ID
    getFoodById: (req, res) => {
        const { id } = req.params;
        Food.getFoodById(id, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Không tìm thấy thực phẩm' });
            res.json(results[0]);
        });
    },

    // Thêm thực phẩm mới
    addFood: (req, res) => {
        const foodData = req.body;
        const { name, price, description, image_url, expiry_date, entry_date, quantity,supplier } = foodData;

        // Kiểm tra đầu vào
        if (!name || !price || !description || !image_url || !expiry_date || !entry_date || !quantity   || !supplier) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin' });
        }

        if (quantity < 0) {
            return res.status(400).json({ message: 'Số lượng không được âm' });
        }

        // Chuyển đổi ngày thành đối tượng Date
        const entryDate = new Date(entry_date);
        const expiryDate = new Date(expiry_date);
        const currentDate = new Date();

        // Kiểm tra logic ngày
        if (isNaN(entryDate.getTime()) || isNaN(expiryDate.getTime())) {
            return res.status(400).json({ message: 'Ngày nhập hoặc hạn sử dụng không hợp lệ' });
        }
        if (entryDate > expiryDate) {
            return res.status(400).json({ message: 'Ngày nhập phải trước hạn sử dụng' });
        }
        if (entryDate > currentDate) {
            return res.status(400).json({ message: 'Ngày nhập không được sau ngày hiện tại' });
        }

        // Kiểm tra thực phẩm đã tồn tại với cùng tên, ngày nhập và ngày hết hạn
        Food.checkFoodExists(name, entry_date, expiry_date, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length > 0) {
                return res.status(400).json({ message: 'Thực phẩm đã tồn tại với cùng tên, ngày nhập và ngày hết hạn' });
            }

            // Thêm thực phẩm vào cơ sở dữ liệu
            Food.addFood(foodData, (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Thực phẩm đã được thêm thành công', id: result.insertId });
            });
        });
    },

    // Cập nhật thực phẩm theo ID
    updateFoodById: (req, res) => {
        const { id } = req.params;
        const foodData = req.body;
        const { name, price, description, image_url, expiry_date, entry_date, quantity,supplier } = foodData;

        // Kiểm tra đầu vào
        if (!name || !price || !description || !image_url || !expiry_date || !entry_date || !quantity  || !supplier) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin' });
            
        }

        if (quantity < 0) {
            return res.status(400).json({ message: 'Số lượng không được âm' });
        }

        // Chuyển đổi ngày thành đối tượng Date
        const entryDate = new Date(entry_date);
        const expiryDate = new Date(expiry_date);
        const currentDate = new Date();

        // Kiểm tra logic ngày
        if (isNaN(entryDate.getTime()) || isNaN(expiryDate.getTime())) {
            return res.status(400).json({ message: 'Ngày nhập hoặc hạn sử dụng không hợp lệ' });
        }
        if (entryDate > expiryDate) {
            return res.status(400).json({ message: 'Ngày nhập phải trước hạn sử dụng' });
        }
        if (entryDate > currentDate) {
            return res.status(400).json({ message: 'Ngày nhập không được sau ngày hiện tại' });
        }

        // Cập nhật thực phẩm theo ID
        Food.updateFoodById(id, foodData, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy thực phẩm' });
            res.json({ message: 'Cập nhật thực phẩm thành công' });
        });
    },

    // Xóa thực phẩm theo ID
    deleteFoodById: (req, res) => {
        const { id } = req.params;
        Food.deleteFoodById(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy thực phẩm' });
            res.json({ message: 'Thực phẩm đã được xóa thành công' });
        });
    }
};

module.exports = foodController;
