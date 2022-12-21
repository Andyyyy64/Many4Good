import express from "express";
import Schema from "../models/schema";
import cors from "cors";
const router: express.Router = express.Router();
const app: express.Express = express();

app.use(cors());
app.use(express.json());
app.use((_req:express.Request, res:express.Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


router.get("/",(_req:express.Request,res:express.Response) => {
  res.send("arigatou");
});


router.post("/addauthuser", async (req:express.Request,res:express.Response) => {
  const { Users } = Schema;
  const username: string = req.body.username;
  const newuser = new Schema.Users({
    username: username,
  });

  try {
    newuser.save((err, _newuserResult) => {
      if(err){
        res.send("err saving");
        return;
      }
      res.redirect('/');
      res.end();
    });
  } catch(err) {
    console.log(err);
  }
  
})

router.get("/getuser",async (_req: express.Request, res: express.Response) => {
  const { Users } = Schema;

  const getUser = await Users.find({}).exec((err,userData) => {
    if(err) throw err;
    if(userData) {
      res.end(JSON.stringify(userData));
    } else {
      res.end();
    }
  });
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
    const userId: any = await Users.findOne({ username : "andy" }).exec();
    const newacounting = new Schema.Acounting({
      name: acountingname,
      cost: acountingcost,
      food: isfood,
      currentmoney: undefined,
      incomename: undefined,
      income: undefined,
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


router.post('/addincome',async (req:express.Request,res:express.Response) => {
  const incomename :string = req.body.incomename;
  const income :number = req.body.income;
  const { Users } = Schema;
  const UserId :any = await Users.findOne({username:"andy"}).exec();
  const newincome = new Schema.Acounting({
    incomename: incomename,
    income: income,
    user: UserId._id,
  });

  try {
    newincome.save((err,_newincomeResult) => {
      if(err) {
        res.end("err saving...");
        return;
      }
      res.redirect("/");
      res.end();
    });
  } catch (err) {
    console.log(err);
  }
});


router.post("/changefoodlimit",async (req:express.Request,res:express.Response) => {
  const foodlimit: number = req.body.foodlimit;
  const { Users } = Schema;
  const UserId: any = await Users.findOne({username:"andy"}).exec();
  const newfoodlimit = new Schema.Acounting({
    foodlimit: foodlimit,
    user: UserId._id,
  });

  try {
    newfoodlimit.save((err,_newfoodlimitReslut) => {
      if(err) {
        res.end("err saving...");
        return;
      }
      res.end();
    });
  } catch (err) {
    console.log(err);
  }
});

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
