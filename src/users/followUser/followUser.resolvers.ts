import client from '../../client';
import { protect } from '../../utils/user';

interface IArgs {
  username: string;
}

export default {
  Mutation: {
    followUser: protect(
      async (_: unknown, { username }: IArgs, { loggedInUser }) => {
        try {
          const userExist = await client.user.findUnique({
            where: { username },
          });

          if (!userExist) {
            throw new Error('user not exist');
          }

          const ok = await client.user.update({
            where: { id: loggedInUser.id },
            data: { following: { connect: [{ username }] } },
          });

          if (!ok) {
            throw new Error('occure error following process');
          }

          return { ok: true };
        } catch (e) {
          return { ok: false, error: e instanceof Error && e.message };
        }
      }
    ),
  },
};
