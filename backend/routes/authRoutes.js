const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAdmins } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/admins', getAdmins); // Public: get list of all admins for handler picker

module.exports = router;
