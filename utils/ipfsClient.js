import { create } from 'ipfs-http-client';

const ipfs = create({
  url: 'https://ipfs.infura.io:5001/api/v0',
  fetch: async (url, options = {}) => {
    // Ensure the duplex option is explicitly set when sending a body
    if (options.body && typeof options.body === 'object') {
      options.duplex = 'half';
    }
    return fetch(url, options);
  },
});

export const uploadToIPFS = async (fileBuffer) => {
  try {
    const { path } = await ipfs.add(fileBuffer);
    console.log('File uploaded to IPFS with CID:', path);
    return path; // Return the CID of the uploaded file
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};
