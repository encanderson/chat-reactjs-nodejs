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

export const sendEmailRecover = async (email) => {
  try {
    const response = await axios({
      method: "POST",
      baseURL: createUrlApi(`/auth/recovery-password`),
      headers: {
        Accept: "application/json;",
        "Content-Type": "application/json",
      },
      data: {
        email: email,
      },
    });
    return response.data;
  } catch (err) {
    return { status: null };
  }
};

export async function verifyCode(data) {
  try {
    const response = await axios({
      method: "POST",
      baseURL: createUrlApi(`/auth/verify-code`),
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
}

export async function changePassword(data) {
  try {
    const response = await axios({
      method: "POST",
      baseURL: createUrlApi(`/auth/reset-password`),
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
}
