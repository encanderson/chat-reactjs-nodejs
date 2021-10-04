import axios from "axios";

import { createUrlApi } from "./baseUrl";

export const searchUsers = async (search) => {
  try {
    const response = await axios({
      method: "POST",
      baseURL: createUrlApi(`/users/search`),
      headers: {
        Accept: "application/json;",
        "Content-Type": "application/json",
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
