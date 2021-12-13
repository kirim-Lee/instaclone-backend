import client from '../../client';
import { protect } from '../../utils/user';

export default {
  Mutation: {
    deletePhoto: protect(
      async (_: unknown, { id }: { id: number }, { loggedInUser }) => {
        try {
          const photo = await client.photo.findUnique({
            where: { id },
            select: { userId: true },
          });

          if (!photo) {
            throw new Error('photo not found');
          }

          if (photo.userId !== loggedInUser.id) {
            throw new Error('not authorized');
          }

          await client.photo.delete({ where: { id } });

          return { ok: true };
        } catch (e) {
          return { ok: false, error: e instanceof Error && e.message };
        }
      }
    ),
  },
};
