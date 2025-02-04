import Notification from "../models/Notification";

exports.getNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(10);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  exports.createNotification = async (userId, type, message) => {
    try {
      await Notification.create({ user: userId, type, message });
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };
  
  exports.markAsRead = async (req, res) => {
    try {
      await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
      res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
