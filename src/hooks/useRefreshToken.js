import axios from "../service/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response);
      return {
        isLoggedIn: true,
        accessToken: response.accessToken,
      };
    });
    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
