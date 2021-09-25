import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from "./actions";

export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  socket: null,
  status: "available",
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_INITIALIZE: {
      const { isLoggedIn, user, socket, status } = action.payload;
      return {
        ...state,
        isLoggedIn,
        isInitialized: true,
        user: user,
        socket: socket,
        status: status,
      };
    }
    case LOGIN: {
      const { user, socket } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user: user,
        status: true,
        socket: socket,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        status: false,
        socket: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
