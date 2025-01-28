import { create } from 'ipfs-http-client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const apiKey = process.env.IPFS_API_KEY;

if (!apiKey) {
  throw new Error('IPFS_API_KEY is not defined in the .env file');
}

const ipfs = create({
  url: 'https://ipfs.infura.io:5001/api/v0',
  headers: {
    Authorization: `Bearer ${apiKey}`, // Pass the API key as a Bearer token
  },
});

export const uploadToIPFS = async (fileBuffer) => {
  try {
    const result = await ipfs.add(fileBuffer);
    console.log('File uploaded to IPFS with CID:', result.path);
    return result.path; // Return the CID of the uploaded file
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Error uploading to IPFS');
  }
};
