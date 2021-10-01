import { hashFunction } from "@src/utils/hashFunction";
import { Users } from "@src/models/users";
import { generateToken } from "@src/utils/jwt";

import { GenericResponse, UserResponse } from "@src/utils/types";
import {sendCode} from "@src/utils/sendEmail";

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

export const sendEmail = async (email: string):Promise<GenericResponse> => {
  const user = await Users.findOne({
    email: email,
  }, {
    email: 1
  }).lean();
  if(user) {
    const code = await sendCode(email);
    if (code){
      await Users.updateOne({
        email: email,
      }, {
        $set: {
          code: code
        }
      });
      return {
        status: true,
        message: "Confira o código enviado ao seu email."
      };
    } else {
      return {
        status: false,
        message: "Nenhum usuário encontrado, por favor verifique os seus dados."
      };
    }
  } else {
    return {
      status: false,
      message: "Nenhum usuário encontrado, por favor verifique os seus dados."
    };
  }
}; 