// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv").config({
  path: "../back-end/.env",
}).parsed;
  
export const config = {
  mongoUrl: dotenv.MONGO_DB_URL,
  secretKey: dotenv.SECRET_KEY,
  emailUser: dotenv.EMAIL_USER,
  emailPass: dotenv.EMAIL_PASS,
  emailServer: dotenv.MAIL_SERVER
};