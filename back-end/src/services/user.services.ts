import { Users } from "@src/models/users";
import { User, GenericResponse } from "@src/utils/types";

export const findUser = async (
  _id: string
): Promise<User | GenericResponse> => {
  const user = await Users.findOne(
    {
      _id: _id,
    },
    {
      email: 1,
      name: 1,
      username: 1,
      picture: 1,
    }
  ).lean();
  if (user) {
    return {
      status: true,
      data: user,
    };
  } else {
    return {
      status: false,
      message: "Usuário não encontrado",
    };
  }
};

export const findUsers = async (
  search: string,
  _id: string
): Promise<unknown> => {
  const users = await Users.find(
    {
      $text: {
        $search: search,
      },
    },
    {
      name: 1,
      username: 1,
      picture: 1,
    }
  ).lean();
  if (users.length) {
    const data = [];
    for (let i = 0; i < users.length; i += 1) {
      const c = users[i]._id;
      if (c !== _id) {
        data.push(users[i]);
      }
    }
    return {
      status: true,
      data: data,
    };
  }
  return {
    status: false,
    message: "Nenhum usuáio encontrado.",
  };
};
