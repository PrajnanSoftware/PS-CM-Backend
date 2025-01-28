const express = require('express');
const multer = require('multer');
const { createForm, getForms, getFormById, getResume } = require('../controllers/formController');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to create a new form entry
router.post('/', upload.single('resume'), createForm);

// Route to fetch all form entries
router.get('/', getForms);

// Route to fetch a single form entry by ID
router.get('/:id', getFormById);

// Route to retrieve a resume PDF by form ID
router.get('/:id/resume', getResume);

module.exports = router;
