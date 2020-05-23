import { Router } from "express";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";

import User from "../models/user.js";
import { generateToken, checkTokenCookie, EXPIRATION_TIME } from "../auth.js";

const router = new Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ email: username }).select("+password");

  if (!user)
    return res.status(400).send({ error: "User not found" });

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: "Invalid password" });

  user.password = undefined;
  const token = generateToken(user.id);
  res.cookie("SESSIONID", token, {
    httpOnly: true,
    signed: true,
    maxAge: EXPIRATION_TIME * 1000,
  });
  res.send({ user, token });
});


router.get("/test", checkTokenCookie, (req, res) => {
  res.send({ ok: true, user: req.userId });
})

export default router;
