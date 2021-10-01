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
import { userSignIn, changePassword, sendEmailRecover } from "@src/api/auth";
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
  sendCode: () => Promise.resolve(),
  email: String,
  verify: Boolean,
  resetPassword: Promise.resolve(),
});

export const JWTProvider = ({ children }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.accounts);

  const [email, setEmail] = React.useState("");
  const [verify, setVerify] = React.useState(false);
  const sendCode = async (user) => {
    const resp = await sendEmailRecover(user);
    if (resp.status) {
      setEmail(user);
      setVerify(true);
      history.push("/verificar-codigo");
    } else {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: "Por favor, verifique os seus dados.",
        variant: "alert",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        alertSeverity: "error",
        close: false,
      });
    }
  };

  const login = async (username, password) => {
    const response = await userSignIn({
      username: username,
      password: password,
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
      history.push("/chat");
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
  };

  const logout = async () => {
    setTimeout(() => dispatch({ type: LOGOUT }), 10);
    setSession(null);
  };

  const resetPassword = async (password, userToken) => {
    const response = await changePassword({
      password: password,
      userToken: userToken,
    });
    if (response.status) {
      history.push("/login");
    } else {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: response.message,
        variant: "alert",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        alertSeverity: "warning",
        close: false,
      });
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem("serviceToken");
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axios.get(createUrlApi("/user/data"));
          const user = response.data.data;
          dispatch({
            type: ACCOUNT_INITIALIZE,
            payload: {
              isLoggedIn: true,
              user: user,
              // socket: socket,
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
        sendCode,
        email,
        verify,
        resetPassword,
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
