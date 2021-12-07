import client from '../../client';

interface IArgs {
  keyword: string;
}

export default {
  Query: {
    searchUsers: async (_: unknown, { keyword }: IArgs) => {
      const users = await client.user.findMany({
        where: {
          OR: [
            { username: { contains: keyword } },
            { firstName: { contains: keyword } },
            { lastName: { contains: keyword } },
          ],
        },
      });
      return users;
    },
  },
};
