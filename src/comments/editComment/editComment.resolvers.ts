import client from '../../client';
import { protect } from '../../utils/user';

type Arg = { id: number; payload: string };

export default {
  Mutation: {
    editComment: protect(
      async (_: unknown, { id, payload }: Arg, { loggedInUser }) => {
        try {
          const comment = await client.comment.findUnique({ where: { id } });

          if (!comment) {
            throw Error('comment not found');
          }

          if (comment.userId !== loggedInUser.id) {
            throw Error('not authorized');
          }

          await client.comment.update({ where: { id }, data: { payload } });

          return { ok: true };
        } catch (e) {
          return { ok: false, error: e instanceof Error && e.message };
        }
      }
    ),
  },
};
