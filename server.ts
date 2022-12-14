import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import routesHandler from "./routes/handler";
import cors from 'cors'
require('dotenv/config')
const app: express.Express = express();
app.use(cors())
app.use((_req, res, next) => {
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

const port = process.env.PORT

//db connection
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.DB_URL ??"", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server started on port ${port}!`);
});
