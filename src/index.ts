require('dotenv').config();

import express from 'express';
import logger from 'morgan';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { IContext } from './@types/common';
import schema from './schema';
import { getUser } from './utils/user';
import { graphqlUploadExpress } from 'graphql-upload';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const startServer = async () => {
  const app = express();

  const httpServer = createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    {
      // This is the `schema` we just created.
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,
      async onConnect(param: any) {
        const user = await getUser(param?.['jwt-token'] as string);
        return user && { loggedInUser: user };
      },
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // Pass a different path here if your ApolloServer serves at
      // a different path.
      path: '/graphql',
    }
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    context: async ({ req }): Promise<IContext | null> => {
      const user = await getUser(req.headers['jwt-token'] as string);
      return user && { loggedInUser: user };
    },
  });

  await server.start();

  app.use(graphqlUploadExpress());
  app.use('/static', express.static('upload'));
  app.use(logger('tiny'));

  server.applyMiddleware({ app });

  const PORT = process.env.PORT;

  await new Promise<void>((r) => httpServer.listen({ port: PORT }, r));

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
};

startServer();
