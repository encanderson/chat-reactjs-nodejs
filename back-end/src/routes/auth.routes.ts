import express from "express";

import { signIn, sendEmailRecovery, verifyCode, resetePassword } from "@src/controllers/auth.controllers";
 
const router = express.Router();

router.post("/login", signIn);
router.post("/recovery-password", sendEmailRecovery);
router.post("/verify-code", verifyCode);
router.post("/reset-password", resetePassword);

module.exports = (app: express.Application) => app.use("/auth", router);