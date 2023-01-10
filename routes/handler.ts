import express from "express";
import Schema from "../models/schema";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
const router: express.Router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const app: express.Express = express();
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());
app.use((_req: express.Request, res: express.Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/", (_req, res) => {
  res.send("arigatou");
});

router.get(
  "/getloginuser",
  async (req: express.Request, res: express.Response) => {
    const { Users } = Schema;
    const email: any = req.query.email;
    const getUser = await Users.find({ email: email }).exec((err, userData) => {
      if (err) throw err;
      if (userData) {
        res.end(JSON.stringify(userData));
      } else {
        res.end();
      }
    });
  }
);

router.post("/adduser", async (req: express.Request, res: express.Response) => {
  const user2name: string = req.body.user2name;
  const email: string = req.body.email;
  const newuser = new Schema.Users({
    username: user2name,
    email: email,
  });

  try {
    newuser.save((err, _newuserResult) => {
      if (err) {
        res.end("err saving...");
        return;
      }
      res.redirect("/");
      res.end;
    });
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/acounting",
  async (req: express.Request, res: express.Response) => {
    const { Acounting } = Schema;
    const email: any = req.query.email;
    const { Users } = Schema;
    const userId: any = await Users.findOne({ email: email }).exec();
    const userAcounting = await Acounting.find({ user: userId?._id })
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
    const whichuser: string = req.body.whichuser;
    const email: string = req.body.email;
    const { Users } = Schema;
    const userId: any = await Users.findOne({ email: email }).exec();
    const newacounting = new Schema.Acounting({
      name: acountingname,
      cost: acountingcost,
      food: isfood,
      whichuser: whichuser,
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

router.post(
  "/addincome",
  async (req: express.Request, res: express.Response) => {
    const incomename: string = req.body.incomename;
    const income: number = req.body.income;
    const whichuser: string = req.body.whichuser;
    const email: any = req.body.email;
    const { Users } = Schema;
    const UserId: any = await Users.findOne({ email: email }).exec();
    const newincome = new Schema.Acounting({
      incomename: incomename,
      income: income,
      whichuser: whichuser,
      user: UserId._id,
    });

    try {
      newincome.save((err, _newincomeResult) => {
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

router.post(
  "/changefoodlimit",
  async (req: express.Request, res: express.Response) => {
    const foodlimit: number = req.body.foodlimit;
    const email: any = req.body.email;
    const { Users } = Schema;
    const UserId: any = await Users.findOne({ email: email }).exec();
    const newfoodlimit = new Schema.Acounting({
      foodlimit: foodlimit,
      user: UserId._id,
    });

    try {
      newfoodlimit.save((err, _newfoodlimitReslut) => {
        if (err) {
          res.end("err saving...");
          return;
        }
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

router.delete(
  "/deleteuser/:id",
  async (req: express.Request, res: express.Response) => {
    const { Users } = Schema;
    const id = req.params.id;
    const deleteusers = await Users.deleteOne({ _id: id });
    res.send(deleteusers);
  }
);

export default router;
