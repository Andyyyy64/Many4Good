import express from "express";
import mongoose from "mongoose";
import { any } from "webidl-conversions";

const routesHandler = require("./routes/handler");
const app: express.Express = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routesHandler);

const port = process.env.PORT || 3000;

//db connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server started on port ${port}!`);
});
