const mongoose = require('mongoose');

// Define the application schema
const applicationSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Shortlisted', 'Rejected', 'Pending', 'Interview Scheduled'], // Added interview as a status
    required: true
  },
  role: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
});

// Create a model based on the schema
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
