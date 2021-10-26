import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import * as AWS from "aws-sdk";
import express from "express";
import * as http from "http";

const PORT = 5000;

import { application } from "./Modules";

const startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = application.createSchemaForApollo();
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const tokenRaw = req.headers.authorization || "";
      const token = tokenRaw.split(" ")[1];
      return { token };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
    ],
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  await server.start();
  server.applyMiddleware({ app });

  app.use("/test", (req, res) => {
    console.log("Welcome to backend!");

    res.statusCode = 200;
    res.send({ message: "Response from backend." });
  });

  httpServer.listen({ port: PORT }, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
  });
  AWS.config.update({ region: "eu-west-1" });
};

startApolloServer();
