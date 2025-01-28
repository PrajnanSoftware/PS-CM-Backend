import { create } from 'ipfs-http-client';
import dotenv from 'dotenv';
import FormData from 'form-data';
import streamifier from 'streamifier'; // Import the streamifier package

// Load environment variables
dotenv.config();

const apiKey = process.env.IPFS_API_KEY;

if (!apiKey) {
  throw new Error('IPFS_API_KEY is not defined in the .env file');
}

const ipfs = create({
  url: 'https://ipfs.infura.io:5001/api/v0',
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export const uploadToIPFS = async (file) => {
  try {
    // Create a FormData object to handle file upload
    const form = new FormData();

    // Convert the buffer to a readable stream
    const fileStream = streamifier.createReadStream(file.buffer);

    // Append the stream to the FormData
    form.append('file', fileStream, file.originalname);

    // Prepare the request options
    const options = {
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${apiKey}`,
      },
      body: form,
    };

    const res = await fetch('https://ipfs.infura.io:5001/api/v0/add', options);
    const result = await res.json();
    
    if (res.ok) {
      console.log('File uploaded to IPFS with CID:', result.Hash);
      return result.Hash; // Return the CID of the uploaded file
    } else {
      console.error('Error uploading to IPFS:', result);
      throw new Error('Error uploading to IPFS');
    }
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Error uploading to IPFS');
  }
};
