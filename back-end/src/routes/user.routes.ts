import express from "express";

import {authMiddleware} from "@src/middlewares/auth";
import {getUser} from "@src/controllers/user.controllers";

const router = express.Router();

router.use(authMiddleware);
router.get("/data", getUser);

module.exports = (app: express.Application) => app.use("/user", router);