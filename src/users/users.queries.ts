import { Prisma, User } from '@prisma/client';
import client from '../client';

export default {
  Query: {
    seeProfile: async (
      _: never,
      { username }: Pick<Prisma.UserWhereUniqueInput, 'username'>
    ): Promise<User | null> => {
      return await client.user.findUnique({ where: { username } });
    },
  },
};
