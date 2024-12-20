const express = require('express');
const router = express.Router();
const drinkController = require('../controllers/drinkController');


// Các route cho thực phẩm
router.get('/drinks', drinkController.getAllDrinks); // Lấy tất cả thực phẩm
router.get('/drinks/:id', drinkController.getDrinkById); // Lấy thực phẩm theo ID
router.post('/drinks', drinkController.addDrink); // Thêm thực phẩm
router.put('/drinks/:id', drinkController.updateDrinkById); // Cập nhật thực phẩm
router.delete('/drinks/:id', drinkController.deleteDrinkById); // Xóa thực phẩm

module.exports = router;
