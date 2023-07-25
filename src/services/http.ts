import axios from 'axios';
import { getCookie } from 'cookies-next';

const API_TOKEN = getCookie('AuthVcgToken') ?? process.env.NEXT_PUBLIC_API_TOKEN;

export const HTTP = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: API_TOKEN
  },
});

export const HTTPMediaUpload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: API_TOKEN
  },
});
 