const express = require('express');
const router = express.Router();
const noodlesController = require('../controllers/noodlesController');

// Các route cho thực phẩm
router.get('/noodless', noodlesController.getAllNoodless); // Correct method name
router.get('/noodless/:id', noodlesController.getNoodlesById); // Correct method name
router.post('/noodless', noodlesController.addNoodles); // Correct method name
router.put('/noodless/:id', noodlesController.updateNoodlesById); // Correct method name
router.delete('/noodless/:id', noodlesController.deleteNoodlesById); // Correct method name

module.exports = router;
