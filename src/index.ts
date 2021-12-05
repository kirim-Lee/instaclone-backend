require('dotenv').config();

import { ApolloServer } from 'apollo-server';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { IContext } from './@types/common';
import schema from './schema';
import { getUser } from './utils/user';

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

const PORT = process.env.PORT;

server.listen(PORT).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
