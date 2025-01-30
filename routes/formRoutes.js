const express = require('express');
const multer = require('multer');
const { createForm, getForms, getFormById, getResume, updateFormStatus } = require('../controllers/formController');

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

// ✅ Route to update form status
router.put('/:id/status', updateFormStatus);

router.get('/status/:status', getFormsByStatus);

module.exports = router;
