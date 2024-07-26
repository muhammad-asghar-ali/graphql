import { buildSchema } from "graphql";

export const schema = buildSchema(`
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
