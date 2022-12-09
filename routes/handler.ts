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

/*
router.get("/adduser", async (req: express.Request, res: express.Response) => {
  const user = { username: "andytakuya" };
  const newuser = new Schema.Users(user);

  try {
    await newuser.save(async (err, newUserResult): Promise<void> => {
      console.log("New user created!!");
      res.end("new user created!!");
    });
  } catch (err) {
    console.log(err);
    res.end('User not added!')
  }
});
*/

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
    const useracounting = req.body.acountinginput;
    const { Users } = Schema;
    const userId: any = await Users.findOne({ username: "andy" }).exec();

    const newacounting = new Schema.Acounting({
      acounting: useracounting,
      user: userId._id,
    });

    try {
      await newacounting.save((err, newacountingResult) => {
        if (err) res.end("Error saving...");
        res.redirect("/");
        res.end();
      });
    } catch (err) {
      console.log(err);
      res.redirect("/");
      res.end();
    }
  }
);

export default router;
