import express from "express";

import {authMiddleware} from "@src/middlewares/auth";
import {getUser, getUsers} from "@src/controllers/user.controllers";

const router = express.Router();

router.use(authMiddleware);
router.get("/data", getUser);
router.post("/search", getUsers);

module.exports = (app: express.Application) => app.use("/users", router);