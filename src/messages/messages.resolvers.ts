import { Room } from '@prisma/client';
import { IContext } from '../@types/common';
import client from '../client';

export default {
  Room: {
    users: ({ id }: Room) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }: Room) =>
      client.message.findMany({
        where: { roomId: id },
        orderBy: { createdAt: 'asc' },
      }),
    unreadTotal: ({ id }: Room, _: unknown, { loggedInUser }: IContext) => {
      if (!loggedInUser) {
        return 0;
      }

      return client.message.count({
        where: {
          roomId: id,
          read: false,
          userId: { not: loggedInUser.id },
          room: { users: { some: { id: loggedInUser.id } } },
        },
      });
    },
  },
};
