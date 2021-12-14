import client from '../../client';
import { protect } from '../../utils/user';

export default {
  Query: {
    seeRooms: protect((_, __, { loggedInUser }) =>
      client.room.findMany({
        where: { users: { some: { id: loggedInUser.id } } },
      })
    ),
  },
};
