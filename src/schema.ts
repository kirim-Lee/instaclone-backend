import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typesArray = mergeTypeDefs(
  loadFilesSync(`${__dirname}/**/*.typeDefs.ts`)
);
const resolversArray = mergeResolvers(
  loadFilesSync(`${__dirname}/**/*.resolvers.ts`) as any
);

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

export default schema;
