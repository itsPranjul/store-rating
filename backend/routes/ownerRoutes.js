const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

router.get('/dashboard', authenticateToken, authorizeRole(['store_owner']), ownerController.getDashboard);

module.exports = router;
