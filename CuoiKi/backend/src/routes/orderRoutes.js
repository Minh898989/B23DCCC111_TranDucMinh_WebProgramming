const express = require('express');
const { createOrder,getAllOrders,getOrdersByUserId } = require('../controllers/orderController');
const{authenticate} = require('../middlewares/authMiddlewares')

const router = express.Router();

router.post('/orders',authenticate, createOrder);
router.get('/orders', getAllOrders);
router.get('/orders/:user_id', getOrdersByUserId);
module.exports = router;