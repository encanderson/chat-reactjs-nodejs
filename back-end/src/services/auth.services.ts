import { hashFunction } from "@src/utils/hashFunction";
import { Users } from "@src/models/users";
import { generateToken, generateTempToken, verifyToken } from "@src/utils/jwt";
import {encryptPassword} from "@src/utils/bcrypt";

import { GenericResponse, UserResponse } from "@src/utils/types";
import { sendCode } from "@src/utils/sendEmail";

interface UserSignIn {
  username: string;
  password: string;
}

interface UserToken {
  status: boolean;
  userToken : string;
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
      picture: 1,
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

export const sendEmail = async (email: string): Promise<GenericResponse> => {
  const user = await Users.findOne(
    {
      email: email,
    },
    {
      email: 1,
    }
  ).lean();
  if (user) {
    const code = await sendCode(email);
    if (code) {
      await Users.updateOne(
        {
          email: email,
        },
        {
          $set: {
            code: code,
          },
        }
      );
      return {
        status: true,
        message: "Confira o código enviado ao seu email.",
      };
    } else {
      return {
        status: false,
        message:
          "Nenhum usuário encontrado, por favor verifique os seus dados.",
      };
    }
  } else {
    return {
      status: false,
      message: "Nenhum usuário encontrado, por favor verifique os seus dados.",
    };
  }
};

export const verifyUser = async (form: {
  code: string;
  email: string;
}): Promise<UserToken> => {
  const user = await Users.findOne(
    {
      email: form.email,
    },
    {
      code: 1,
    }
  ).lean();
  if (user && user.code === form.code) {
    const token = await generateTempToken(form.email);
    return {
      status: true,
      userToken: token,
    };
  } else {
    return {
      status: false,
      userToken: "Código não confere.",
    };
  }
};

export const changePassword = async (
  form: {password: string, userToken: string}
): Promise<GenericResponse> => {
  const email = verifyToken(form.userToken);
  if (email){
    const hash = await encryptPassword(form.password);
    await Users.updateOne({
      email: email
    }, {
      $set: {
        password: hash
      }
    });
    return {
      status: true,
      message: "Atualização realizada com sucesso!",
    };
  } else {
    return {
      status: false,
      message: "Usuário não autorizado.",
    };
  }
};
