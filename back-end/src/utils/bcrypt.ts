import * as bcrypt from "bcrypt";

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const comparePassword = async (password: string,
  hashPassword: string): Promise<boolean> => {
  const validPassword = await bcrypt.compare(password, hashPassword);
  if (validPassword){
    return true;
  } else {
    return false;
  }
};
