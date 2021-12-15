import client from '../../client';
import { protect } from '../../utils/user';

export default {
  Mutation: {
    readMessage: protect(
      async (_, { id }: { id: number }, { loggedInUser }) => {
        try {
          const message = await client.message.findFirst({
            where: {
              id,
              userId: { not: loggedInUser.id }, // 내가 보낸 메세지가 아니어야하고
              room: { users: { some: { id: loggedInUser.id } } }, // 내가 해당 룸에 있어야 함
            },
            select: { id: true },
          });

          if (!message) {
            throw Error('message not found');
          }

          await client.message.update({ where: { id }, data: { read: true } });

          return { ok: true };
        } catch (e) {
          return { ok: false, error: e instanceof Error && e.message };
        }
      }
    ),
  },
};
