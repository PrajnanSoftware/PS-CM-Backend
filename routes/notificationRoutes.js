const express = require("express");
const notificationController = require("../controllers/notificationController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Ensure the functions exist
router.get("/", authMiddleware, notificationController.getNotifications); 
router.post("/", authMiddleware, notificationController.createNotification); 
router.put("/:id/read", authMiddleware, notificationController.markAsRead); 

module.exports = router;
