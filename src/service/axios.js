import axios from "axios";

const URL_BACKEND = "http://localhost:9090";
const instance = axios.create({
  baseURL: URL_BACKEND,
  // withCredentials: true,
});
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
instance.interceptors.response.use((response) => {
  return response.data;
});

export const axiosPrivate = axios.create({
  baseURL: URL_BACKEND,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export default instance;
