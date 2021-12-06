import client from '../../client';

interface IArgs {
  username: string;
  page: number;
}

const LIMIT = 10;
export default {
  Query: {
    seeFollowers: async (_: unknown, { username, page }: IArgs) => {
      try {
        const userExist = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });

        if (!userExist) {
          throw new Error('username is not exist');
        }

        const followers = await client.user
          .findUnique({ where: { username } })
          .followers({ skip: page * LIMIT, take: LIMIT });

        const count = await client.user.count({
          where: { following: { some: { username } } },
        });

        return { ok: true, followers, totalPages: Math.ceil(count / LIMIT) };
      } catch (e) {
        return { ok: false, error: e instanceof Error && e.message };
      }
    },
  },
};
