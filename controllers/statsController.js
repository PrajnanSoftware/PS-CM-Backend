const Form = require('../models/form'); // ✅ Use Form model instead of Application

// Function to get application stats
const getApplicationStats = async (req, res) => {
  try {
    // Get the total number of applications
    const totalApplications = await Form.countDocuments(); // ✅ Use Form model

    // Get the count of applications based on status
    const statusDistribution = await Form.aggregate([
      {
        $group: {
          _id: "$status", // Group by status
          count: { $sum: 1 }, // Count occurrences
        }
      },
      {
        $project: {
          status: "$_id", // Rename _id to status
          count: 1,
          _id: 0
        }
      }
    ]);

    // Get the count of applications based on role
    const roleDistribution = await Form.aggregate([
      {
        $group: {
          _id: "$role", // Group by role
          count: { $sum: 1 }, // Count occurrences
        }
      },
      {
        $project: {
          role: "$_id", // Rename _id to role
          count: 1,
          _id: 0
        }
      }
    ]);

    // Get the count of applications based on position
    const positionDistribution = await Form.aggregate([
      {
        $group: {
          _id: "$position", // Group by position
          count: { $sum: 1 }, // Count occurrences
        }
      },
      {
        $project: {
          position: "$_id", // Rename _id to position
          count: 1,
          _id: 0
        }
      }
    ]);

    // Send the stats data as a response
    res.status(200).json({
      totalApplications,
      statusDistribution,
      roleDistribution,
      positionDistribution
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

module.exports = { getApplicationStats };
