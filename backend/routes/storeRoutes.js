const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, storeController.getStores);

module.exports = router;
