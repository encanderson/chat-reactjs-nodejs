import nodemailer from "nodemailer";

import { generateCode } from "@src/utils/helpers";
import { config } from "@src/config";


const transporter = nodemailer.createTransport({
  host: config.emailServer,
  port: 465,
  secure: true,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

export const sendCode = async (email: string): Promise<number | boolean> => {
  const code = generateCode();
  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: "Código de confirmação",
    html: `<h1>Código de verificação:</h1><p>${code}</p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log(info.response);
      return code;
    }
  });
  return code;
};
