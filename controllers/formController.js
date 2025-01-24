const Form = require('../models/form');
const multer = require('multer');

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' }); // Store the files in 'uploads' directory

// Create a new form entry
const createForm = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      position,
      role,
      education,
      collegeName,
      specialization,
      cgpa,
      graduationYear,
      skills,
      personalComputer,
      preferredStartDate,
      timePerWeek,
      experienceYears,
      passOutYear,
      currentCTC,
      expectedCTC,
      whyPrajnan,
      howDidYouHear,
    } = req.body;

    // If file is uploaded, store its path (assuming a file input field for resume)
    const resume = req.file ? req.file.path : null;

    if (!name || !email || !phone || !position || !role) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const form = new Form({
      name,
      email,
      phone,
      position,
      role,
      education,
      collegeName,
      specialization,
      cgpa,
      graduationYear,
      skills,
      personalComputer,
      preferredStartDate,
      timePerWeek,
      experienceYears,
      passOutYear,
      currentCTC,
      expectedCTC,
      whyPrajnan,
      howDidYouHear,
      resume,
    });

    await form.save();
    res.status(201).json({ message: 'Form submitted successfully', form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all form entries
const getForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single form entry by ID
const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createForm,
  getForms,
  getFormById,
};
