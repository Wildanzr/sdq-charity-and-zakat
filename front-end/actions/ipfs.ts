"use server"

import axios from 'axios';
const TATUM_API_KEY = process.env.TATUM_API_KEY;
const URL_ENDPOINT = 'https://api.tatum.io/v3/ipfs';

export interface IPFSResponse {
  details: string
  description: string
  images: string[]
  previous: string
  target: string;
  title: string;
}


export const uploadToIPFS = async (content: string) => {
  try {
    const formData = new FormData();
    const bufferedContent = Buffer.from(content);
    formData.append("file", new Blob([bufferedContent], { type: "application/json" }), "metadata.json");

    const response = await axios.post(URL_ENDPOINT, formData, {
      headers: {
        'x-api-key': TATUM_API_KEY,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload to IPFS');
  }
}

export const getFromIPFS = async (hash: string) => {
  try {
    const response = await axios.get(`${URL_ENDPOINT}/${hash}`, {
      headers: {
        'x-api-key': TATUM_API_KEY,
        'Accept': 'application/json'
      }
    });
    return response.data as IPFSResponse;
  } catch (error) {
    console.error(error);
    return {} as IPFSResponse;
  }
}