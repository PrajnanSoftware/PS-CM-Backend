
import { create } from 'ipfs-http-client';

const ipfs = create({
  url: 'https://ipfs.infura.io:5001/api/v0',
  fetch: async (url, options) => {
    return fetch(url, {
      ...options,
      duplex: 'half', // Explicitly set the duplex option
    });
  },
});

export const uploadToIPFS = async (fileBuffer) => {
  try {
    const { path } = await ipfs.add(fileBuffer);
    return path; // Returns the CID of the file
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};
