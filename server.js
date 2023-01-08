"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var handler_1 = __importDefault(require("./routes/handler"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use("/", handler_1["default"]);
var port = process.env.PORT;
//db connection
mongoose_1["default"].set('strictQuery', false);
mongoose_1["default"]
    .connect((_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function () {
    console.log("DB connected!");
})["catch"](function (err) {
    console.log(err);
});
app.listen(port, function () {
    console.log("server started on port ".concat(port, "!"));
});
