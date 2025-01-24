const express = require('express');
const { createForm, getForms, getFormById } = require('../controllers/formController');
const multer = require('multer');
const { uploadToIPFS } = require('../utils/ipfsClient'); // Import the IPFS upload function
const router = express.Router();

// Setup multer for file uploads (using memory storage to keep files in memory)
const storage = multer.memoryStorage();  // Use memory storage to upload files directly to IPFS
const upload = multer({ storage: storage });

// Route to create a new form entry
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const formData = req.body;

    // If there's a file, upload it to IPFS
    let resumeCID = null;
    if (req.file) {
      resumeCID = await uploadToIPFS(req.file.buffer);
      formData.resume = resumeCID; // Store the CID of the uploaded resume in the form data
    }

    // Save the form data with the IPFS CID (Assuming you're saving the form in a database like MongoDB)
    const form = await createForm(formData);
    return res.status(201).json({ message: 'Form submitted successfully', form });
  } catch (error) {
    console.error('Error in form submission:', error);
    return res.status(500).json({ message: 'Error submitting form' });
  }
});

// Route to fetch all form entries
router.get('/', getForms);

// Route to fetch a single form entry by ID
router.get('/:id', getFormById);

module.exports = router;
