const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+@.+\..+/, 'Please provide a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'],
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
  },
  education: { type: String, required: false },
  collegeName: { type: String, required: false },
  specialization: { type: String, required: false },
  cgpa: { type: String, required: false },
  graduationYear: { type: String, required: false },
  skills: { type: String, required: false },
  personalComputer: { type: String, required: false },
  preferredStartDate: { type: Date, required: false },
  timePerWeek: { type: String, required: false },
  experienceYears: { type: String, required: false },
  passOutYear: { type: String, required: false },
  currentCTC: { type: String, required: false },
  expectedCTC: { type: String, required: false },
  whyPrajnan: { type: String, required: false },
  howDidYouHear: { type: String, required: false },
  resume: {
    data: Buffer, // Binary data to store the PDF
    contentType: String, // MIME type of the file
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

formSchema.index({ email: 1, position: 1 }, { unique: true });

module.exports = mongoose.model('Form', formSchema);
