const express = require('express');
const { registerUser, verifyOTP, loginUser, } = require('../controllers/userController');


const router = express.Router();

router.post('/register', registerUser);
router.post('/otp', verifyOTP);
router.post('/login', loginUser);



module.exports = router;
