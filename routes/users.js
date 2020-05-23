import express from "express";
import path from 'path';

import User, { createUser } from "../models/user.js";

const router = express.Router();


router.post("/", async (req, res) => {  // Criar novo usuario
  if (req.body) {
    await createUser(req.body)
      .then(() => {
        res.sendFile(path.join(req.context.front, "area-do-consumidor.html"));
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

router.post("/get", (req, res) => {   // Resgatar um usuario a partir do userId ou email
  if(req.body.hasOwnProperty('_id')) {
    User.findById(req.body.userId, (err, doc) => {
      if (err) {
        console.log("Error when fetching user  " + err);
        return res.status(422).json({ error: err.message });
      } else {
        console.log("Succesfully fetched user");
        return res.json(doc);
      }
    });
  } else if(req.body.hasOwnProperty('email')) {
    User.findOne({ email: req.body.email }, (err, doc) => {
      if (err) {
        console.log("Error when fetching user  " + err);
        return res.status(422).json({ error: err.message });
      } else if(doc == null) {
        console.log("User not found");
        return res.status(422).json({ error: "user not found"});
      } else {
        console.log("Succesfully fetched user  " + doc);
        return res.json(doc);
      }
    });
  } else {
    console.log("No email or id supplied");
    return res.status(422).json();
  }
});

export default router;

