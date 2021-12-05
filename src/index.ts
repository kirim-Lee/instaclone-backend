require('dotenv').config();

const express = require('express');

import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { IContext } from './@types/common';
import schema from './schema';
import { getUser } from './utils/user';
import { graphqlUploadExpress } from 'graphql-upload';

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: async ({ req }): Promise<IContext | null> => {
      const user = await getUser(req.headers['jwt-token']);
      return user && { loggedInUser: user };
    },
  });

  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  const PORT = process.env.PORT;

  await new Promise<void>((r) => app.listen({ port: PORT }, r));

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
};

startServer();
