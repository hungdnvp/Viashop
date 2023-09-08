import axios from "./axios";

const handleLoginApi = (username, password) => {
  try {
    let result = axios.post(
      "/api/login",
      { username, password },
      { withCredentials: true }
    );
    return result;
  } catch (err) {
    return {
      errCode: -1,
      errMessage: "No Server Response",
    };
  }
};
const handleRegisterApi = (inputData) => {
  try {
    let result = axios.post("/api/register", inputData);
    return result;
  } catch (err) {
    return {
      errCode: -1,
      errMessage: "No Server Response",
    };
  }
};
const logoutService = () => {
  try {
    let data = axios.get("/api/logout", { withCredentials: true });
    return data;
  } catch (err) {
    return {
      errCode: -1,
      errMessage: "No Server Response",
    };
  }
};
const handleChangePassword = (userId, currentPass, newPass) => {
  return axios.post(
    "/api/changePassword",
    { userId, currentPass, newPass },
    { withCredentials: true }
  );
};
// const getAccountInfo = (userId) => {
//   return axios.get(`/api/getAccountInfo?userId=${userId}`);
// };
export {
  handleLoginApi,
  handleRegisterApi,
  logoutService,
  handleChangePassword,
  // getAccountInfo,
};
