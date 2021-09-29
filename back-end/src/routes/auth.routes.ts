import express from "express";

import {signIn} from "@src/controllers/auth.controllers";

const router = express.Router();

router.post("/login", signIn);

module.exports = (app: express.Application) => app.use("/auth", router);