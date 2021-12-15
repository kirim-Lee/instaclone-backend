import { Message } from '@prisma/client';
import { withFilter } from 'graphql-subscriptions';
import { IContext } from '../../@types/common';
import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';

export default {
  Subscription: {
    roomUpdates: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        async (
          { roomUpdates }: { roomUpdates: Message },
          _: unknown,
          { loggedInUser }: IContext
        ) => {
          console.log(loggedInUser);
          const room = await client.room.findFirst({
            where: {
              id: roomUpdates.roomId,
              users: { some: { id: loggedInUser?.id } },
            },
          });
          return loggedInUser && Boolean(room);
        }
      ),
    },
  },
};
