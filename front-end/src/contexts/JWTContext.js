import React, { createContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

// third-party
import jwtDecode from "jwt-decode";
// import { io } from "socket.io-client";

// reducer - state management
import {
  ACCOUNT_INITIALIZE,
  LOGIN,
  LOGOUT,
  SNACKBAR_OPEN,
  // EDIT,
} from "@src/store/actions";

// project imports
import axios from "@src/utils/axios";
import Loader from "@src/components/Loader";
import { userSignIn } from "@src/api/auth";
import { createUrlApi } from "@src/api/baseUrl";
// import config from "@src/config";

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

export const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem("serviceToken", serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem("serviceToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

//-----------------------|| JWT CONTEXT & PROVIDER ||-----------------------//

const JWTContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => {},
});

export const JWTProvider = ({ children }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.accounts);

  const login = async (code, token) => {
    const userId = verifyToken(token);
    if (userId) {
      const decoded = jwtDecode(token);
      const _id = decoded._id;
      const response = await userSignIn({
        userId: _id,
        code: code,
      });
      if (response.status) {
        const { serviceToken, user } = response;
        sessionStorage.setItem("serviceToken", serviceToken);
        setSession(serviceToken);
        dispatch({
          type: LOGIN,
          payload: {
            user: user,
          },
        });
      } else {
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: response.message,
          variant: "alert",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          alertSeverity: "error",
          close: false,
        });
        history.push("/");
      }
    }
  };

  const logout = async () => {
    setTimeout(() => dispatch({ type: LOGOUT }), 10);
    setSession(null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem("serviceToken");
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axios.get(createUrlApi("/auth/user"));
          const user = response.data.user;
          dispatch({
            type: ACCOUNT_INITIALIZE,
            payload: {
              isLoggedIn: true,
              user: user,
              // socket: socket,
              status: user.status,
            },
          });
        } else {
          dispatch({
            type: ACCOUNT_INITIALIZE,
            payload: {
              isLoggedIn: false,
              user: null,
              socket: null,
              status: false,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: ACCOUNT_INITIALIZE,
          payload: {
            isLoggedIn: false,
            user: null,
            socket: null,
            status: false,
          },
        });
      }
    };

    init();
  }, [dispatch]);

  if (!state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
