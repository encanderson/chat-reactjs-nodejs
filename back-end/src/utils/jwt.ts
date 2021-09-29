import jwt from "jsonwebtoken";

import {config} from "@src/config";
import {comparePassword} from "@src/utils/bcrypt";


export const generateToken = async (_id: string,
  password: string,
  hasPassword: string): Promise<string | boolean> => {
  if(await comparePassword(password, hasPassword)){
    const token = jwt.sign({_id}, config.secretKey, {
      expiresIn: 86400
    });
    return token;
  } else {
    return false;
  }
};