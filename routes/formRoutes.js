const express = require('express');
const { createForm, getForms, getFormById } = require('../controllers/formController');
const multer = require('multer');
const router = express.Router();

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' }); // You can configure it to a specific folder

// Route to create a new form entry
router.post('/', upload.single('resume'), createForm);

// Route to fetch all form entries
router.get('/', getForms);

// Route to fetch a single form entry by ID
router.get('/:id', getFormById);

module.exports = router;
