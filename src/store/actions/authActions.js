import actionTypes from "./actionTypes";

export const loginSuccess = (user) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: user,
  };
};
export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
export const toggleRememberMe = () => {
  return {
    type: actionTypes.TOGGLE_REMEMBER_ME,
  };
};
