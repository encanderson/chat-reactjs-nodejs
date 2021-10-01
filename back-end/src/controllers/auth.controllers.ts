import { Request, Response } from "express";

import { authUser } from "@src/services/auth.services";
import { sendEmail } from "@src/services/auth.services";

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body;

    const resp = await authUser(user);

    res.status(200).send(resp);
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "We get a trouble in our server, please, try again.",
    });
  }
};

export const sendEmailRecovery = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const email = req.body.email;

    const resp = await sendEmail(email);

    res.status(200).send(resp);
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "We get a trouble in our server, please, try again.",
    });
  }
};
