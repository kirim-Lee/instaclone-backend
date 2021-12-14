import client from '../../client';
import { protect } from '../../utils/user';

export default {
  Query: {
    seeRoom: protect(async (_, { id }: { id: number }, { loggedInUser }) =>
      client.room.findFirst({
        where: { id, users: { some: { id: loggedInUser.id } } },
      })
    ),
  },
};
