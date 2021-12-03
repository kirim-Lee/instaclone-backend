import { Prisma } from '@prisma/client';
import client from '../client';

export default {
  Mutation: {
    createAccount: async (_: never, data: Prisma.UserCreateInput) => {
      const { email, username } = data;

      // email / username unique check
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existingUser) {
        return null;
      }

      // TODO: hash password

      return await client.user.create({ data });
    },
  },
};
