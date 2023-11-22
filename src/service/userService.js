import axios from "./axios";

const handleLoginApi = async (username, password) => {
  try {
    let result = await axios.post(
      "/api/login",
      { username, password },
      { withCredentials: "include" }
    );
    return result;
  } catch (err) {
    return {
      errCode: -1,
      errMessage: "No Server Response",
    };
  }
};
const handleRegisterApi = async (inputData) => {
  try {
    return await axios.post("/api/register", inputData);
  } catch (err) {
    return {
      errCode: -1,
      errMessage: "No Server Response",
    };
  }
};
const logoutService = async () => {
  try {
    return await axios.get("/api/logout", { withCredentials: true });
  } catch (err) {
    return {
      errCode: -1,
      errMessage: "No Server Response",
    };
  }
};

const autoLogin = async () => {
  return await axios
    .get("api/autoLogin", { withCredentials: true })
    .catch((res) => {
      console.log("autoLogin fail");
    });
};
const forGotPass = async (email) => {
  return await axios.get(`/api/forGotPass?email=${email}`).catch((err) => {
    console.log("request forgot Password fail");
  });
};
const confirmforGotPass = async (data) => {
  return await axios.post("/api/confirmForGotPass", data).catch((err) => {
    console.log("request confirm forgot password fail");
  });
};
export {
  handleLoginApi,
  handleRegisterApi,
  logoutService,
  autoLogin,
  forGotPass,
  confirmforGotPass,
  // getAccountInfo,
};
