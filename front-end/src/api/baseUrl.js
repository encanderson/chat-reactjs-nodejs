import config from "@src/config";

const AUTH_URL = config.baseUrl;

export const createUrlApi = (path) => {
  const url = `${AUTH_URL}${path}`;
  return url;
};
