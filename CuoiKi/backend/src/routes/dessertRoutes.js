const express = require('express');
const router = express.Router();
const dessertController = require('../controllers/dessertController');

// Lấy tất cả món tráng miệng
router.get('/dessert', dessertController.getAllDesserts);

// Lấy món tráng miệng theo ID
router.get('/dessert/:id', dessertController.getDessertById);

// Thêm món tráng miệng
router.post('/dessert', dessertController.addDessert);

// Cập nhật món tráng miệng theo ID
router.put('/dessert/:id', dessertController.updateDessertById);

// Xóa món tráng miệng theo ID
router.delete('/dessert/:id', dessertController.deleteDessertById);

module.exports = router;
