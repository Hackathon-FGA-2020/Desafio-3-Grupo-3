import "dotenv/config.js";
import express from "express";
import routes from "./routes/index.js";
import path from 'path';
import models, { connectDb } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/", (req, res, next) => {
  req.context = {
    front: path.join(__dirname, "front"),
    models: models,
    //user: models.users[1],
  };
  next();
});

app.use('/', express.static('front'));
app.use("/users", routes.users);
app.use("/producers", routes.producers);
app.use("/session", routes.session);
app.use("/product", routes.product);
app.use("/productoffer", routes.productoffer);
app.use("/order", routes.order);

connectDb()
  .then(async () => {
    app.listen(PORT, () => console.log(`app running at port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
