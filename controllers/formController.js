import Form from '../models/form';
import { uploadToIPFS } from '../utils/ipfsClient'; // Import the IPFS upload function

// Function to handle form submission
export const createForm = async (req, res) => {
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

    if (!name || !email || !phone || !position || !role) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    let resumeCID = null;

    if (req.file) {
      const fileBuffer = req.file.buffer;
      try {
        resumeCID = await uploadToIPFS(fileBuffer);
      } catch (ipfsError) {
        console.error('Error uploading file to IPFS:', ipfsError);
        return res.status(500).json({ message: 'Error uploading file to IPFS.', error: ipfsError });
      }
    }

    const formData = {
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
      resume: resumeCID,
    };

    const form = new Form(formData);
    const savedForm = await form.save();
    res.status(201).json({ message: 'Form submitted successfully.', form: savedForm });
  } catch (error) {
    console.error('Error in createForm:', error);
    res.status(500).json({ message: 'Server error.', error });
  }
};

// Get all form entries
export const getForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error in getForms:', error);
    res.status(500).json({ message: 'Server error.', error });
  }
};

// Get a single form entry by ID
export const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found.' });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error('Error in getFormById:', error);
    res.status(500).json({ message: 'Server error.', error });
  }
};
