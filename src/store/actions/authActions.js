import actionTypes from "./actionTypes";
export const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: token,
  };
};
export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
