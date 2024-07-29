import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schema/article";
import { resolvers } from "./resolvers";

const app = express();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

// Start Apollo Server
const startServer = async () => {
  await server.start();

  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      // Optionally, add additional context here
    })
  );

  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.error("Error occurred:", err.message);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    }
  );

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
