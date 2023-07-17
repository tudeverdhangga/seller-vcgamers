import axios from 'axios';

export const HTTP = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.NEXT_PUBLIC_API_TOKEN
  },
});

export const HTTPMediaUpload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: process.env.NEXT_PUBLIC_API_TOKEN
  },
});
 