import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchme = new Schema({
  // _id: uid
  username: String,
  email: String,
  entryDate: { type: Date, default: Date.now },
});

const acountingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  name: String,
  cost: Number,
  food: Boolean,
  incomename: String,
  income: Number,
  foodlimit: Number,
  whichuser: String,
  Date: { type: Date, default: Date.now },
});
const Users = mongoose.model("users", userSchme, "users");
const Acounting = mongoose.model("acounting", acountingSchema, "acounting");

const mySchemas = { Users: Users, Acounting: Acounting };

export default mySchemas;
