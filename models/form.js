const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  cgpa: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  personalComputer: {
    type: String,
    required: true,
  },
  preferredStartDate: {
    type: String,
    required: true,
  },
  timePerWeek: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: String,
    required: true,
  },
  passOutYear: {
    type: String,
    required: true,
  },
  currentCTC: {
    type: String,
    required: true,
  },
  expectedCTC: {
    type: String,
    required: true,
  },
  whyPrajnan: {
    type: String,
    required: true,
  },
  howDidYouHear: {
    type: String,
    required: true,
  },
  resume: {
    type: String, // Store the file URL if using file upload, else Buffer for raw file data
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Form', formSchema);
