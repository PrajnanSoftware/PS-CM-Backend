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
    required: [true, 'Education is required'],
  },
  collegeName: {
    type: String,
    required: [true, 'College name is required'],
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
  },
  cgpa: {
    type: String,
    required: [true, 'CGPA is required'],
  },
  graduationYear: {
    type: String,
    required: [true, 'Graduation year is required'],
  },
  skills: {
    type: String,
    required: [true, 'Skills are required'],
  },
  personalComputer: {
    type: String,
    required: [true, 'Personal computer information is required'],
  },
  preferredStartDate: {
    type: Date, // Using Date for better handling of date inputs
    required: [true, 'Preferred start date is required'],
  },
  timePerWeek: {
    type: String,
    required: [true, 'Time per week information is required'],
  },
  experienceYears: {
    type: String,
    required: [true, 'Experience years are required'],
  },
  passOutYear: {
    type: String,
    required: [true, 'Pass-out year is required'],
  },
  currentCTC: {
    type: String,
    required: [true, 'Current CTC is required'],
  },
  expectedCTC: {
    type: String,
    required: [true, 'Expected CTC is required'],
  },
  whyPrajnan: {
    type: String,
    required: [true, 'This field is required'],
  },
  howDidYouHear: {
    type: String,
    required: [true, 'This field is required'],
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
