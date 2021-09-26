import axios from "axios";

import { createUrlApi } from "./baseUrl";

export const userRegister = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      baseURL: createUrlApi(`/register`),
      headers: {
        Accept: "application/json;",
        "Content-Type": "application/json",
      },
      data: data,
    });
    return response.data;
  } catch (err) {
    return { status: null };
  }
};

export const userSignIn = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      baseURL: createUrlApi(`/auth/login`),
      headers: {
        Accept: "application/json;",
        "Content-Type": "application/json",
      },
      data: data,
    });
    return response.data;
  } catch (err) {
    return { status: null };
  }
};
