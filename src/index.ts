require('dotenv').config();

import { ApolloServer } from 'apollo-server';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import schema from './schema';

const server = new ApolloServer({
  schema,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

const PORT = process.env.PORT;

server.listen(PORT).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
