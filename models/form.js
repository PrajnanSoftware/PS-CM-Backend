const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+@.+\..+/, 'Please provide a valid email address'], // Email validation
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'], // Example: 10-digit validation
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
  },
  education: {
    type: String,
    required: false,
  },
  collegeName: {
    type: String,
    required: false,
  },
  specialization: {
    type: String,
    required: false,
  },
  cgpa: {
    type: String,
    required: false,
  },
  graduationYear: {
    type: String,
    required: false,
  },
  skills: {
    type: String,
    required: false,
  },
  personalComputer: {
    type: String,
    required: false,
  },
  preferredStartDate: {
    type: Date, // Using Date for better handling of date inputs
    required: false,
  },
  timePerWeek: {
    type: String,
    required: false,
  },
  experienceYears: {
    type: String,
    required: false,
  },
  passOutYear: {
    type: String,
    required: false,
  },
  currentCTC: {
    type: String,
    required: false,
  },
  expectedCTC: {
    type: String,
    required: false,
  },
  whyPrajnan: {
    type: String,
    required: false,
  },
  howDidYouHear: {
    type: String,
    required: false,
  },
  resume: {
    type: String, // Storing the IPFS CID or URL
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Form', formSchema);
