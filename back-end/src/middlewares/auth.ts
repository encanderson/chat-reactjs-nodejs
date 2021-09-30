/* eslint-disable indent */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { config } from "@src/config";

interface DataStoredInToken {
  _id: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .send({ status: false, message: "Nenhum token foi informado" });
  }
  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).send({ status: false, message: "Token inválido" });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ status: false, message: "Token inválido" });
  }

  try {
    const verify = jwt.verify(token, config.secretKey) as DataStoredInToken;

    req.body._id = verify._id;

    next();
    return;
  } catch(err){
    return res.status(401).send({ status: false, message: "Token inválido" });
  }
};
