import { NextFunction } from "express";
import socket from "socket.io";
import jwt from "jsonwebtoken";

import { config } from "@src/config/config";
import { Rooms } from "@src/models/rooms";

export const socketMiddleware = async (
  client: socket.Socket,
  next: NextFunction
): Promise<unknown> => {
  try {
    const authToken = client.handshake.auth.token;

    if (!authToken) {
      const err = new Error("not authorized");
      next(err);
    }

    const parts = authToken.split(" ");
    if (parts.length !== 2) {
      const err = new Error("not authorized");
      next(err);
    }

    jwt.verify(authToken, config.secretKey, async (err, decoded) => {
      if (err) return next(err);

      const _id = decoded._id;

      await Rooms.updateOne(
        {
          _id: _id,
        },
        {
          room: client.id,
        },
        { upsert: true }
      );

      next();
    });
  } catch (err) {
    return next(err);
  }
};
