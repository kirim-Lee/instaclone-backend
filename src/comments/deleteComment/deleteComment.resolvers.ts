import client from '../../client';
import { protect } from '../../utils/user';

export default {
  Mutation: {
    deleteComment: protect(
      async (_: unknown, { id }: { id: number }, { loggedInUser }) => {
        try {
          const comment = await client.comment.findUnique({
            where: { id },
            select: { userId: true },
          });

          if (!comment) {
            throw new Error('comment not found');
          }

          if (comment.userId !== loggedInUser.id) {
            throw new Error('not authorized');
          }

          await client.comment.delete({ where: { id } });

          return { ok: true };
        } catch (e) {
          return { ok: false, error: e instanceof Error && e.message };
        }
      }
    ),
  },
};
