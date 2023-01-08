"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var schema_1 = __importDefault(require("../models/schema"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var router = express_1["default"].Router();
var app = (0, express_1["default"])();
dotenv_1["default"].config();
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get("/", function (req, res) {
    res.send("arigatou");
});
router.get("/getloginuser", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Users, email, getUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Users = schema_1["default"].Users;
                email = req.query.email;
                return [4 /*yield*/, Users.find({ email: email }).exec(function (err, userData) {
                        if (err)
                            throw err;
                        if (userData) {
                            res.end(JSON.stringify(userData));
                        }
                        else {
                            res.end();
                        }
                    })];
            case 1:
                getUser = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post("/adduser", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user2name, email, Users, newuser;
    return __generator(this, function (_a) {
        user2name = req.body.user2name;
        email = req.body.email;
        Users = schema_1["default"].Users;
        newuser = new schema_1["default"].Users({
            username: user2name,
            email: email
        });
        try {
            newuser.save(function (err, _newuserResult) {
                if (err) {
                    res.end("err saving...");
                    return;
                }
                res.redirect("/");
                res.end;
            });
        }
        catch (err) {
            console.log(err);
        }
        return [2 /*return*/];
    });
}); });
router.get("/acounting", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Acounting, email, Users, userId, userAcounting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Acounting = schema_1["default"].Acounting;
                email = req.query.email;
                Users = schema_1["default"].Users;
                return [4 /*yield*/, Users.findOne({ email: email }).exec()];
            case 1:
                userId = _a.sent();
                return [4 /*yield*/, Acounting.find({ user: userId === null || userId === void 0 ? void 0 : userId._id })
                        .populate("user")
                        .exec(function (err, acountingData) {
                        if (err)
                            throw err;
                        if (acountingData) {
                            res.end(JSON.stringify(acountingData));
                        }
                        else {
                            res.end();
                        }
                    })];
            case 2:
                userAcounting = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post("/addacounting", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var acountingname, acountingcost, isfood, whichuser, email, Users, userId, newacounting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                acountingname = req.body.name;
                acountingcost = req.body.cost;
                isfood = req.body.food;
                whichuser = req.body.whichuser;
                email = req.body.email;
                Users = schema_1["default"].Users;
                return [4 /*yield*/, Users.findOne({ email: email }).exec()];
            case 1:
                userId = _a.sent();
                newacounting = new schema_1["default"].Acounting({
                    name: acountingname,
                    cost: acountingcost,
                    food: isfood,
                    whichuser: whichuser,
                    user: userId._id
                });
                try {
                    newacounting.save(function (err, _newacountingResult) {
                        if (err) {
                            res.end("err saving...");
                            return;
                        }
                        res.redirect("/");
                        res.end();
                    });
                }
                catch (err) {
                    console.log(err);
                }
                return [2 /*return*/];
        }
    });
}); });
router.post('/addincome', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var incomename, income, whichuser, email, Users, UserId, newincome;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                incomename = req.body.incomename;
                income = req.body.income;
                whichuser = req.body.whichuser;
                email = req.body.email;
                Users = schema_1["default"].Users;
                return [4 /*yield*/, Users.findOne({ email: email }).exec()];
            case 1:
                UserId = _a.sent();
                newincome = new schema_1["default"].Acounting({
                    incomename: incomename,
                    income: income,
                    whichuser: whichuser,
                    user: UserId._id
                });
                try {
                    newincome.save(function (err, _newincomeResult) {
                        if (err) {
                            res.end("err saving...");
                            return;
                        }
                        res.redirect("/");
                        res.end();
                    });
                }
                catch (err) {
                    console.log(err);
                }
                return [2 /*return*/];
        }
    });
}); });
router.post("/changefoodlimit", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foodlimit, email, Users, UserId, newfoodlimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                foodlimit = req.body.foodlimit;
                email = req.body.email;
                Users = schema_1["default"].Users;
                return [4 /*yield*/, Users.findOne({ email: email }).exec()];
            case 1:
                UserId = _a.sent();
                newfoodlimit = new schema_1["default"].Acounting({
                    foodlimit: foodlimit,
                    user: UserId._id
                });
                try {
                    newfoodlimit.save(function (err, _newfoodlimitReslut) {
                        if (err) {
                            res.end("err saving...");
                            return;
                        }
                        res.end();
                    });
                }
                catch (err) {
                    console.log(err);
                }
                return [2 /*return*/];
        }
    });
}); });
router["delete"]("/deleteacounting/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Acounting, id, deleteacounting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Acounting = schema_1["default"].Acounting;
                id = req.params.id;
                return [4 /*yield*/, Acounting.deleteOne({ _id: id })];
            case 1:
                deleteacounting = _a.sent();
                res.send(deleteacounting);
                return [2 /*return*/];
        }
    });
}); });
router["delete"]("/deleteuser/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Users, id, deleteusers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Users = schema_1["default"].Users;
                id = req.params.id;
                return [4 /*yield*/, Users.deleteOne({ _id: id })];
            case 1:
                deleteusers = _a.sent();
                res.send(deleteusers);
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
