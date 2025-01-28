import Form from '../models/form';

export const createForm = async (req, res) => {
  try {
    // Convert prototype-less req.body to a plain object
    console.log('Before conversion:', req.body); // Should log: [Object: null prototype] {...}
    const formData = Object.assign({}, req.body);
    console.log('After conversion:', formData); // Should log a plain object


    // Destructure the plain object
    const { name, email, phone, position, role } = formData;

    // Validate fields
    if (!name || !email || !phone || !position || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Save form data
    const form = new Form(formData);
    const savedForm = await form.save();

    res.status(201).json({ message: 'Form submitted successfully', form: savedForm });
  } catch (error) {
    console.error('Error in createForm:', error);
    res.status(500).json({ message: 'Server error', error });
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
