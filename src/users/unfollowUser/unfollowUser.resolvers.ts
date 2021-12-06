import client from '../../client';
import { protect } from '../../utils/user';

interface IArgs {
  username: string;
}

export default {
  Mutation: {
    unfollowUser: protect(async (_, { username }: IArgs, { loggedInUser }) => {
      try {
        const existUser = await client.user.findUnique({ where: { username } });
        if (!existUser) {
          throw new Error('username is not exist');
        }

        const ok = await client.user.update({
          where: { id: loggedInUser.id },
          data: { following: { disconnect: [{ username }] } },
        });

        if (!ok) {
          throw new Error('occure error unfollowing process');
        }

        return { ok: true };
      } catch (e) {
        return { ok: false, error: e instanceof Error && e.message };
      }
    }),
  },
};
