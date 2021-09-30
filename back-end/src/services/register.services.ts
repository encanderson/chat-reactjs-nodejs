import { hashFunction } from "@src/utils/hashFunction";
import { Users } from "@src/models/users";
import { encryptPassword } from "@src/utils/bcrypt";
import {saveImage} from "@src/utils/image";

import { GenericResponse } from "@src/utils/types";

interface User {
  consents: {
    privacy: boolean;
    terms: boolean;
  };
  email: string;
  name: string;
  password: string;
  username: string;
}

export const addUser = async (user: User): Promise<GenericResponse> => {
  const username = await Users.findOne(
    {
      _id: hashFunction(user.username),
    },
    {
      _id: 1,
    }
  ).lean();
  if (username) {
    return {
      status: false,
      message: "User already exist!",
    };
  }
  await Users.create({
    _id: hashFunction(user.username),
    consents: user.consents,
    email: user.email,
    name: user.name,
    username: user.username,
    password: await encryptPassword(user.password),
    picture: await saveImage(),
  });
  return {
    status: true,
    message: "User added successfully!",
  };
};
