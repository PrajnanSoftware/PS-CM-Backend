const Notification = require("../models/Notification");

// ✅ Get Notifications for a User
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Create a New Notification
exports.createNotification = async (userId, type, message) => {
  try {
    await Notification.create({ userId, type, message });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

// ✅ Mark Notification as Read
exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Server error" });
  }
};
