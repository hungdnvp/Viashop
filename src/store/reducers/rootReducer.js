import actionTypes from "../actions/actionTypes";
const initialState = {
  isLoggedIn: false,
  user: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, user: action.payload };
    case actionTypes.LOGOUT:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};

export default rootReducer;
