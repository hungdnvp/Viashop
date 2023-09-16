import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
instance.interceptors.response.use((response) => {
  return response.data;
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export default instance;
