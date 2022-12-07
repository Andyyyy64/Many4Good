import express from "express";
const router: express.Router = express.Router();
const app:express.Express = express()
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
router.get("/acounting", (req: express.Request, res: express.Response) => {
  const str = [
    {
      name: "andy",
      msg: "this is my first acounting",
    },
  ];
  res.end(JSON.stringify(str));
});

router.post("/addacounting", (req: express.Request, res: express.Response) => {
  res.end("NA");
});

module.exports = router;
