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
      picture: 1
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
