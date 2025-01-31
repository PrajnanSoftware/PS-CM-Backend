import Form from '../models/form';

const nodemailer = require('nodemailer');

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
     // Send confirmation email to the user
     sendConfirmationEmail(savedForm.email, savedForm.name);
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

    res.status(200).json({ message: "Status updated successfully", form: updatedForm });
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


// Function to send a confirmation email
const sendConfirmationEmail = async (userEmail, userName) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "talentacquisition@prajnansoftwares.com",
      pass: "Prajnan@321", // Use App Password if 2FA is enabled
    },
    logger: true, // Enable logging for debugging
    debug: true,  // Debug mode to see errors in console
  });

  // Verify the SMTP connection
  transporter.verify((error, success) => {
    if (error) {
      console.error("SMTP Connection Error:", error);
    } else {
      console.log("SMTP Server is ready to take our messages.");
    }
  });

  const mailOptions = {
    from: `"Prajnan Software" <talentacquisition@prajnansoftwares.com>`,
    to: userEmail,
    subject: "Form Submission Confirmation || PS",
    text: `Hello ${userName},\n\nThank you for submitting your form. We have received your application and will review it shortly.\n\nBest regards,\nHR Team \nPrajnan Software Pvt Ltd.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent:", info);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
