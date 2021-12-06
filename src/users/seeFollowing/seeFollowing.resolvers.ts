import client from '../../client';

interface IArgs {
  username: string;
  cursor?: number;
}

const LIMIT = 10;

export default {
  Query: {
    seeFollowing: async (_: unknown, { username, cursor }: IArgs) => {
      try {
        const userExist = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });

        if (!userExist) {
          throw new Error('username is not exist');
        }

        const following = await client.user
          .findUnique({ where: { username } })
          .following({
            take: LIMIT,
            ...(cursor && { cursor: { id: cursor }, skip: 1 }),
          });

        return { ok: true, cursor: following[LIMIT - 1]?.id, following };
      } catch (e) {
        return { ok: false, error: e instanceof Error && e.message };
      }
    },
  },
};
