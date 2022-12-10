import express from "express";
import Schema from "../models/schema";
const router: express.Router = express.Router();
const app: express.Express = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get(
  "/acounting",
  async (req: express.Request, res: express.Response) => {
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
    const acountingname: string = req.body.acountingnameinput;
    const acountingcost: number = req.body.acountingcostinput;
    const isfood: boolean = req.body.isfoodinput;
    const { Users } = Schema;
    const userId: any = await Users.findOne({ username: "andy" }).exec();
    const newacounting = new Schema.Acounting({
      name: acountingname,
      cost: acountingcost,
      food: isfood,
      user: userId._id,
    });

    try {
       newacounting.save((err, newacountingResult) => {
        err
          ? res.status(201).send("Successfully created a new acounting data!!")
          : res.status(500).send("requset failed");
      });
    } catch (err) {
      console.error(err)
      res.status(400).send(err);
    }
  }
);

export default router;
