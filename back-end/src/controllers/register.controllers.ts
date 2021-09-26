import { Request, Response } from "express";

import {addUser} from "@src/services/register.services";

export const userRegister = async (req: Request, res: Response): Promise<void> =>{
  try {
    const user = req.body;

    const resp = await addUser(user);
    res.status(200).send(resp);
  } catch (err){
    res.status(500).send({
      status: false,
      message: "We get a trouble in our server, please, try"
    });
  }
};