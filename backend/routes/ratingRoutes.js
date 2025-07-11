const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

router.post('/', authenticateToken, authorizeRole(['normal']), ratingController.submitRating);

module.exports = router;
