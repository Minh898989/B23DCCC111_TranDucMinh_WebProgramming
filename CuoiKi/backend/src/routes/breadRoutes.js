// routes/breadRoutes.js
const express = require('express');
const breadController = require('../controllers/breadController');
const router = express.Router();

// Định nghĩa các routes cho Bread
router.get('/breads', breadController.getAllBreads);
router.get('/breads/:id', breadController.getBreadById);
router.post('/breads', breadController.addBread);
router.put('/breads/:id', breadController.updateBreadById);
router.delete('/breads/:id', breadController.deleteBreadById);

module.exports = router;
