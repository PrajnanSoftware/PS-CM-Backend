import Form from '../models/form';
import { create } from 'ipfs-http-client';

// Connect to an IPFS node (Infura)
const ipfs = create('https://ipfs.infura.io:5001/api/v0');

// Function to upload file to IPFS
const uploadToIPFS = async (fileBuffer) => {
  try {
    const result = await ipfs.add(fileBuffer);
    console.log('File uploaded to IPFS with CID:', result.path);
    return result.path; // Return the CID of the uploaded file
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Error uploading to IPFS');
  }
};

// Function to handle form submission
export const createForm = async (formData) => {
  try {
    const form = new Form(formData);
    const savedForm = await form.save();
    return savedForm;
  } catch (error) {
    console.error('Error in createForm:', error);
    throw new Error('Error saving form data');
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
