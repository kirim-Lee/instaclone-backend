import { Prisma } from '@prisma/client';
import client from '../client';
import { hashPassword } from '../utils/hash';

export default {
  Mutation: {
    createAccount: async (_: never, user: Prisma.UserCreateInput) => {
      try {
        const { email, username } = user;

        // email / username unique check
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });

        if (existingUser) {
          throw new Error('this username/password is already taken');
        }

        // hash password
        const password: string = await hashPassword(user.password);

        return await client.user.create({ data: { ...user, password } });
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
