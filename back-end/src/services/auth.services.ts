import { hashFunction } from "@src/utils/hashFunction";
import { Users } from "@src/models/users";
import { generateToken } from "@src/utils/jwt";

import { GenericResponse, UserResponse } from "@src/utils/types";

interface UserSignIn {
  username: string;
  password: string;
}

export const authUser = async (
  form: UserSignIn
): Promise<UserResponse | GenericResponse> => {
  const user = await Users.findOne(
    {
      _id: hashFunction(form.username),
    },
    {
      email: 1,
      name: 1,
      username: 1,
      password: 1,
      picture: 1
    }
  ).lean();
  if (user) {
    const token = await generateToken(user._id, form.password, user.password);
    if (token) {
      delete user["password"];
      return {
        status: true,
        user: user,
        serviceToken: token,
      };
    } else {
      return {
        status: false,
        message: "Dados incorretos, por favor, verifique os seus dados",
      };
    }
  } else {
    return {
      status: false,
      message: "Dados incorretos, por favor, verifique os seus dados",
    };
  }
};
