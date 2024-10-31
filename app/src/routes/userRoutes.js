// src/routes/userRoutes.js
// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.use(authMiddleware)

router.get('/profile', userController.getProfile); // Test sans middleware
router.put('/profile', userController.updateProfile);
router.get('/quota', userController.getQuota);

module.exports = router;
