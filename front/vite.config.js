"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var vite_1 = require("vite");
var plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
// https://vitejs.dev/config/
exports["default"] = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1["default"])()]
});
