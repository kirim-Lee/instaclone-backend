import { Prisma, User } from '@prisma/client';
import client from '../client';
import { comparePassword, hashPassword } from '../utils/hash';
import { sign } from '../utils/sign';

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

    login: async (
      _: never,
      { username, password }: Pick<User, 'username' | 'password'>
    ): Promise<LoginResult> => {
      try {
        // find user with username
        const user = await client.user.findUnique({ where: { username } });

        if (!user) {
          throw new Error('user not found');
        }

        // password compare
        const passwordOk = await comparePassword(password, user.password);

        if (!passwordOk) {
          throw new Error('incorrect password');
        }

        // webtoken
        const token = sign(user.id);

        if (!token) {
          throw new Error("token couldn't be created");
        }

        return { ok: true, token };
      } catch (e) {
        return { ok: false, error: e instanceof Error ? e.message : '' };
      }
    },
  },
};
