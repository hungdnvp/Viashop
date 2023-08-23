import axios from "./axios";

const handleLoginApi = (username, password) => {
  let result = axios.post(
    "/api/login",
    { username, password },
    { withCredentials: true }
  );
  if (result.errCode === 0) {
    //set JWT token to local
    // localStorage.setItem("token", result.token);
    // axios = axios.setAuthToken(result.token);
  }
  return result;
};
const handleRegisterApi = (inputData) => {
  return axios.post("/api/register", inputData);
};
const logoutService = () => {
  return axios.get("/api/logout", { withCredentials: true });
};
const getAccountInfo = (userId) => {
  return axios.get(`/api/getAccountInfo?id=${userId}`);
};
export { handleLoginApi, handleRegisterApi, logoutService, getAccountInfo };
