import { Request, Response } from "express";

import {
  authUser,
  verifyUser,
  sendEmail,
  changePassword,
} from "@src/services/auth.services";

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
    if (resp.status) {
      res.status(200).send(resp);
    } else {
      res.status(400).send(resp);
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "We get a trouble in our server, please, try again.",
    });
  }
};

export const verifyCode = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const form = req.body;

    const resp = await verifyUser(form);

    if (resp.status) {
      res.status(200).send(resp);
    } else {
      res.status(400).send(resp);
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "We get a trouble in our server, please, try again.",
    });
  }
};

export const resetePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const form = req.body;

    const resp = await changePassword(form);
    if (resp.status) {
      res.status(200).send(resp);
    } else {
      res.status(401).send(resp);
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "We get a trouble in our server, please, try again.",
    });
  }
};
