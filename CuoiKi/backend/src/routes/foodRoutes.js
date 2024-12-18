const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Các route cho thực phẩm
router.get('/foods', foodController.getAllFoods); // Lấy tất cả thực phẩm
router.get('/foods/:id', foodController.getFoodById); // Lấy thực phẩm theo ID
router.post('/foods', foodController.addFood); // Thêm thực phẩm
router.put('/foods/:id', foodController.updateFoodById); // Cập nhật thực phẩm
router.delete('/foods/:id', foodController.deleteFoodById); // Xóa thực phẩm

module.exports = router;
