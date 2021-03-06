import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';
import { protect } from '../../utils/user';

interface IArgs {
  payload: string;
  roomId?: number;
  userId?: number;
}

const makeRoomByUserId = async (userId: number, loggedInUserId: number) => {
  const user = await client.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw Error('user not exist');
  }

  const room = await client.room.findFirst({
    where: {
      AND: [
        { users: { some: { id: userId } } },
        { users: { some: { id: loggedInUserId } } },
      ],
    },
  });

  if (room) {
    return room;
  }

  return await client.room.create({
    data: {
      users: { connect: [{ id: userId }, { id: loggedInUserId }] },
    },
  });
};

const getRoom = async (id: number, loggedInUserId: number) => {
  return await client.room.findFirst({
    where: { id, users: { some: { id: loggedInUserId } } },
  });
};

export default {
  Mutation: {
    sendMessage: protect(
      async (_, { payload, roomId, userId }: IArgs, { loggedInUser }) => {
        try {
          const room = userId
            ? await makeRoomByUserId(userId, loggedInUser.id)
            : roomId
            ? await getRoom(roomId, loggedInUser.id)
            : null;

          if (room) {
            const message = await client.message.create({
              data: {
                payload,
                roomId: room.id,
                userId: loggedInUser.id,
              },
            });

            await pubsub.publish(NEW_MESSAGE, { roomUpdates: message });

            return { ok: true };
          }

          throw Error('should be existed roomId or userId');
        } catch (e) {
          return { ok: false, error: e instanceof Error && e.message };
        }
      }
    ),
  },
};
