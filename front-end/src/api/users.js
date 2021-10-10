import axios from "axios";

import { createUrlApi } from "./baseUrl";

export const searchUsers = async (search) => {
  const token = localStorage.getItem("serviceToken");
  try {
    const response = await axios({
      method: "POST",
      baseURL: createUrlApi(`/users/search`),
      headers: {
        Accept: "application/json;",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        search: search,
      },
    });
    return response.data;
  } catch (err) {
    return { status: null };
  }
};
