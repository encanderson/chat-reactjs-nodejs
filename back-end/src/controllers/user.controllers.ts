import { Request, Response } from "express";

import {findUser} from "@src/services/user.services";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id = req.body._id;

    const user = await findUser(_id);

    res.status(200).send(user);
    
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "We get a trouble in our server, please, try again.",
    });
  }
};
