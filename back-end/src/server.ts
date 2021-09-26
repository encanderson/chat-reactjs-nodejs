import http from "http";
import { Server } from "socket.io";
require("express-async-errors");

import app from "@src/app";

const PORT = process.env.PORT || 4000;

export const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires

httpServer.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});