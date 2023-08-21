import actionTypes from "../actions/actionTypes";
const initialState = {
  isLoggedIn: false,
  token: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, token: action.payload };
    case actionTypes.LOGOUT:
      return { ...state, isLoggedIn: false, token: null };
    default:
      return state;
  }
};

export default rootReducer;
