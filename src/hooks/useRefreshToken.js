import axios from "../service/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      if (response?.accessToken) {
        return {
          accessToken: response.accessToken,
          email: response.email,
        };
      }
    });
    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
