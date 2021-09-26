import express from "express";

import {userRegister} from "@src/controllers/register.controllers";
const router = express.Router();

router.post("/register", userRegister);

module.exports = (app: express.Application) => app.use("/", router);