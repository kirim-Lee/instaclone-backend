import client from '../../client';
import { protect } from '../../utils/user';

export default {
  Query: {
    seeFeed: protect(async (_: unknown, __: never, { loggedInUser }) => {
      return await client.photo.findMany({
        where: {
          OR: [
            { user: { followers: { some: { id: loggedInUser.id } } } },
            { userId: loggedInUser.id },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
    }),
  },
};
