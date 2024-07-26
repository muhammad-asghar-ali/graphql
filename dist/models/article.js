"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = void 0;
const config_1 = require("../config");
exports.ArticleModel = config_1.db.collection("articles");
