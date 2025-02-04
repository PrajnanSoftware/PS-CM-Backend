const express = require('express');
const { getNotifications, markAsRead, createNotification } = require('../controllers/notificationController.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get("/", authMiddleware, getNotifications); // Get notifications
router.post("/", authMiddleware, createNotification); // Create notification
router.put("/:id/read", authMiddleware, markAsRead); // Mark as read

module.exports = router;
