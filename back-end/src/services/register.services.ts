import {hashFunction} from "@src/utils/hashFunction";
import {Users} from "@src/models/users";
import {encryptPassword} from "@src/utils/bcrypt";

interface User {
    email: string;
    name: string;
    password: string;
    username: string;
}

interface GenericResponse { 
    status: boolean;
    message: string
}

export const addUser = async (user: User): Promise<GenericResponse> => {
  const username = await Users.findOne({
    _id: hashFunction(user.username)
  }, {
    _id: 1
  }).lean();
  if (username){
    return {
      status: false,
      message: "User already exist!"
    };
  }
  await Users.create({
    _id: hashFunction(user.username),
    email: user.email,
    name: user.name,
    username: user.username,
    password: await encryptPassword(user.password)
  });
  return {
    status: true,
    message: "User added successfully!"
  };
};