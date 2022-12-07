import mysql from "mysql";
import express from "express";
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

const port = 3000;

const router: express.Router = express.Router();

router.get("/api/get", (req: express.Request, res: express.Response) => {
  res.send(req.query);
});

router.post("/api/post", (req: express.Request, res: express.Response) => {
  res.send(req.body);
});

app.use(router);

app.listen(port, () => {
  console.log(`server started on port ${port}!`);
});
