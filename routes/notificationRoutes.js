const express = require("express");
const { getNotifications, createNotification, markAsRead } = require("../controllers/notificationController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Ensure the functions exist
router.get("/", authMiddleware, getNotifications); 
router.post("/", authMiddleware, createNotification); 
router.put("/:id/read", authMiddleware, markAsRead); 

module.exports = router;
