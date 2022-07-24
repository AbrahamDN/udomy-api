"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const directory_tree_1 = __importDefault(require("directory-tree"));
const crypto_1 = require("crypto");
const router = (0, express_1.Router)();
const folderPath = "../client/public/lessons";
router.get("/", (req, res) => {
    const callback = (item, path) => {
        var _a;
        item.name = item.name.replace(/\.[^.]*$/, "");
        item.custom = {
            id: (0, crypto_1.createHash)("sha1").update(path).digest("base64"),
            count: item.name.match(/^[^\d]*(\d+)/),
            path: (_a = path.match(/(?=lessons).*$/)) === null || _a === void 0 ? void 0 : _a.toString(),
        };
    };
    const dirTree = (0, directory_tree_1.default)(folderPath, {
        attributes: ["atime", "birthtime", "ctime", "extension", "mtime", "type"],
    }, callback, callback);
    res.send(dirTree);
});
exports.default = router;
