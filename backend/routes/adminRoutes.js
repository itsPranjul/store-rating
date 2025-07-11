const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

router.get('/dashboard', authenticateToken, authorizeRole(['admin']), adminController.getDashboard);
router.get('/Users', authenticateToken, authorizeRole(['admin']), adminController.getUsers);
router.post('/createUsers', authenticateToken, authorizeRole(['admin']), adminController.createUser);

router.get('/stores', authenticateToken, authorizeRole(['admin']), adminController.getStores);
router.post('/createStores', authenticateToken, authorizeRole(['admin']), adminController.createStore);

module.exports = router;
