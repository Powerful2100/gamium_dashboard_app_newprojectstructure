import { SESSION_SET_STATUS, SESSION_DISCONNECTED } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  sessionid: null,
};

// Changes are made with pure functions (https://redux.js.org/understanding/thinking-in-redux/three-principles#changes-are-made-with-pure-functions)

function sessionReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case SESSION_SET_STATUS:
      return { 
        ...state,
        isAuthenticated: data.isAuthenticated,
        sessionid: data.sessionid,
      }
    case SESSION_DISCONNECTED:
      return { 
        initialState,
      }
    default:
      return state;
  }
};

export default sessionReducer;

