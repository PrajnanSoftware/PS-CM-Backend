import fetch from 'node-fetch';

export const uploadToIPFS = async (fileBuffer) => {
  try {
    const formData = new FormData();
    formData.append('file', new Blob([fileBuffer]), 'resume.pdf');
    
    const response = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data && data.Hash) {
      console.log('File uploaded to IPFS with CID:', data.Hash);
      return data.Hash;  // Return the CID
    } else {
      throw new Error('Error uploading to IPFS');
    }
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};
