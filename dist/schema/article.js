"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
exports.schema = (0, graphql_1.buildSchema)(`
  type Article {
    _key: String
    title: String!
    description: String!
  }

  type Query {
    articles: [Article]
    article(_key: String!): Article
  }

  input ArticleInput {
    title: String!
    description: String!
  }

  type Mutation {
    createArticle(article: ArticleInput): Article
    updateArticle(_key: String!, article: ArticleInput): Article
    deleteArticle(_key: String!): String
  }
`);
