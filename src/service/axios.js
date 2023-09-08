import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
instance.interceptors.response.use((response) => {
  return response.data;
});

export const setAuthToken = (token) => {
  if (token) {
    return axios.get(process.env.REACT_APP_BACKEND_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else delete axios.defaults.headers.common["Authorization"];
  return axios;
};
export default instance;
