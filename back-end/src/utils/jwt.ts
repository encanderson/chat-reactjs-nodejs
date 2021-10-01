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

export const generateTempToken = async (email: string): Promise<string> => {
  const token = jwt.sign({email}, config.secretKey, {
    expiresIn: 180
  });
  return token;
};

interface DataStoredInToken {
  email: string;
}

export const verifyToken = (
  token: string
): string => {

  try {
    const verify = jwt.verify(token, config.secretKey) as DataStoredInToken;

    return verify.email;
    
  } catch(err){
    return "";
  }
};