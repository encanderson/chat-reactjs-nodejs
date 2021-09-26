// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv").config({
  path: "../back-end/.env",
}).parsed;
  
export const config = {
  mongoUrl: dotenv.MONGO_DB_URL,
  secretKey: dotenv.SECRET_KEY,
};
  