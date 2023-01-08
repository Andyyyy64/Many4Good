"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var userSchme = new Schema({
    // _id: uid
    username: String,
    email: String,
    entryDate: { type: Date, "default": Date.now }
});
var acountingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "users" },
    name: String,
    cost: Number,
    food: Boolean,
    incomename: String,
    income: Number,
    foodlimit: Number,
    whichuser: String,
    Date: { type: Date, "default": Date.now }
});
var Users = mongoose_1["default"].model("users", userSchme, "users");
var Acounting = mongoose_1["default"].model("acounting", acountingSchema, "acounting");
var mySchemas = { Users: Users, Acounting: Acounting };
exports["default"] = mySchemas;
