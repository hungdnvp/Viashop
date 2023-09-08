import actionTypes from "../actions/actionTypes";
const initialState = {
  rememberMe: false,
  isLoggedIn: false,
  userInfo: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_REMEMBER_ME:
      return { ...state, rememberMe: !state.rememberMe };
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, userInfo: action.payload };
    case actionTypes.LOGOUT:
      return { ...state, isLoggedIn: false, userInfo: null };
    default:
      return state;
  }
};

export default appReducer;
