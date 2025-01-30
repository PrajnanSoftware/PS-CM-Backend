import Form from '../models/form';

// Create a new form
export const createForm = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log
    console.log('File:', req.file); // Debug log for the file

    // Convert prototype-less req.body to a plain object
    const formData = Object.assign({}, req.body);

    // Destructure the plain object
    const { name, email, phone, position, role } = formData;

    // Validate fields
    if (!name || !email || !phone || !position || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new form instance
    const form = new Form(formData);

    // Handle file upload
    if (req.file) {
      form.resume = {
        data: req.file.buffer, // Store file as binary data
        contentType: req.file.mimetype, // Store the file MIME type
      };
    }

    // Save form data to the database
    const savedForm = await form.save();
    res.status(201).json({ message: 'Form submitted successfully', form: savedForm });
  } catch (error) {
    console.error('Error in createForm:', error);
    if (error.code === 11000) {
      res.status(400).json({
        message: "You have already applied for this position with this email. Please use a different email or choose another position.",
      });
    } else {
      res.status(500).json({ message: "Server error. Please try again." });
    }
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

// Retrieve and serve the resume as a PDF
export const getResume = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form || !form.resume) {
      return res.status(404).json({ message: 'Resume not found.' });
    }

    res.contentType(form.resume.contentType);
    res.send(form.resume.data);
  } catch (error) {
    console.error('Error in getResume:', error);
    res.status(500).json({ message: 'Server error.', error });
  }
};

// ✅ Update Form Status
export const updateFormStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const updatedForm = await Form.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found." });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error("Error in updateFormStatus:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};

export const getFormsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const forms = await Form.find({ status });

    if (!forms.length) {
      return res.status(404).json({ message: `No applications found with status: ${status}` });
    }

    res.status(200).json(forms);
  } catch (error) {
    console.error("Error in getFormsByStatus:", error);
    res.status(500).json({ message: "Server error.", error });
  }
};
