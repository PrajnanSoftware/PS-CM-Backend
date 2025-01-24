import { create } from 'ipfs-http-client';

// Connect to an Infura IPFS node
const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

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

export default { uploadToIPFS };
