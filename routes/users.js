import express from "express";
import path from 'path';

import User, { createUser } from "../models/user.js";
import { generateToken, EXPIRATION_TIME } from "../auth.js";

const router = express.Router();

router.post("/", async (req, res) => {  // Criar novo usuario
  if (req.body) {
    await createUser(req.body)
      .then((user) => {
        const token = generateToken(user.id);
        res.cookie("SESSIONID", token, {
          httpOnly: true,
          signed: true,
          maxAge: EXPIRATION_TIME * 1000,
        });
        res.send({ user, token });
        // res.sendFile(path.join(req.context.front, "area-do-consumidor.html"));
      })
      .catch((err) => {
        if (err.name === "MongoError" && err.code === 11000) {
          res.status(422).json({ error: "Email must be unique" });
        } else {
          res.status(422).json({ error: err.message });
        }
      });
  } else {
    res.statusCode(400);
  }
});

router.get("/", (req, res) => {   // Resgatar um usuario a partir do userId
  if (!req.body.userId) {
    res.status(422).json({ error: "Inform the userId key" });
  }

  User.findById(req.body.userId, (err, doc) => {
    if (err) {
      res.status(422).json({ error: err.message });
    } else {

      res.json(doc);
    }
  });
});

export default router;
