const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/profile', authenticateToken, userController.getProfile);
router.put('/password', authenticateToken, userController.updatePassword);

module.exports = router;
