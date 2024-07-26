"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const article_1 = require("./schema/article"); // Ensure this is compatible with Apollo
const resolvers_1 = require("./resolvers");
const app = (0, express_1.default)();
const server = new server_1.ApolloServer({
    typeDefs: article_1.schema,
    resolvers: resolvers_1.articleResolver,
});
app.use(express_1.default.json());
app.use("/graphql", (0, express4_1.expressMiddleware)(server, {
// Optionally, add additional context here
}));
app.use((err, req, res, next) => {
    console.error("Error occurred:", err.message);
    res.status(500).send(`Internal Server Error: ${err.message}`);
});
exports.default = app;
