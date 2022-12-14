import express from "express";
import Schema from "../models/schema";
import cors from "cors";
const router: express.Router = express.Router();
const app: express.Express = express();

app.use(cors());
app.use(express.json());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get(
  "/acounting",
  async (_req: express.Request, res: express.Response) => {
    const { Acounting } = Schema;

    const userAcounting = await Acounting.find({})
      .populate("user")
      .exec((err, acountingData) => {
        if (err) throw err;
        if (acountingData) {
          res.end(JSON.stringify(acountingData));
        } else {
          res.end();
        }
      });
  }
);

router.post(
  "/addacounting",
  async (req: express.Request, res: express.Response) => {
    const acountingname: string = req.body.name;
    const acountingcost: number = req.body.cost;
    const isfood: boolean = req.body.food;
    const { Users } = Schema;
    const userId: any = await Users.findOne({ username: "andy" }).exec();
    const newacounting = new Schema.Acounting({
      name: acountingname,
      cost: acountingcost,
      food: isfood,
      user: userId._id,
    });

    try {
      newacounting.save((err, _newacountingResult) => {
        if (err) {
          res.end("err saving...");
          return;
        }
        res.redirect("/");
        res.end();
      });
    } catch (err) {
      console.log(err);
    }
  }
);

router.delete(
  "/deleteacounting/:id",
  async (req: express.Request, res: express.Response) => {
    const { Acounting } = Schema;
    const id = req.params.id;
    const deleteacounting = await Acounting.deleteOne({ _id: id });
    res.send(deleteacounting);
  }
);

export default router;
