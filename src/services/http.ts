import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";

function responseHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: AxiosResponse<any, any>
) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}
function errorHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (error.response && error.response.status === 401) {
    window.location.href = env.NEXT_PUBLIC_AUTH_URL;
  }

  return Promise.reject(error);
}

export const HTTP = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
HTTP.interceptors.response.use(responseHandler, errorHandler);

export const HTTPUpload = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
HTTPUpload.interceptors.response.use(responseHandler, errorHandler);

export const HTTPApi = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
HTTPApi.interceptors.response.use(responseHandler, errorHandler);

export const HTTPCsv = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {  "Content-Type": "text/csv" },
  withCredentials: true,
});
HTTPCsv.interceptors.response.use(responseHandler, errorHandler);

export const HTTPXlsx = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  },
  responseType: "arraybuffer",
  withCredentials: true,
});
HTTPXlsx.interceptors.response.use(responseHandler, errorHandler);