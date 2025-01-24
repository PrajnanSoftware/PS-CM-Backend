import Form, { find, findById } from '../models/form';
import multer, { memoryStorage } from 'multer';
import { create } from 'ipfs-http-client';

// Connect to an IPFS node (using Infura in this case)
const ipfs = create('https://ipfs.infura.io:5001/api/v0');

// Configure multer for file upload (use memory storage instead of a file path)
const storage = memoryStorage(); // Store files in memory to upload directly to IPFS
const upload = multer({ storage: storage }); // Use the memory storage

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

    // If file is uploaded, upload it to IPFS and store the CID (Content Identifier)
    let resumeCID = null;
    if (req.file) {
      const fileBuffer = req.file.buffer; // Get the file buffer from memory
      const result = await ipfs.add(fileBuffer); // Upload the file to IPFS
      resumeCID = result.path; // Get the CID from the IPFS response
    }

    // Validate required fields
    if (!name || !email || !phone || !position || !role) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Create the form entry with the resume CID (if available)
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
      resume: resumeCID, // Store the CID instead of the file path
    });

    // Save the form data to the database
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
    const forms = await find().sort({ createdAt: -1 });
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
    const form = await findById(id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export default {
  createForm,
  getForms,
  getFormById,
};
