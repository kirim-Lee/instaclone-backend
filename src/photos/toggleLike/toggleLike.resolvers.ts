import client from '../../client';
import { protect } from '../../utils/user';

export default {
  Mutation: {
    toggleLike: protect(
      async (_: unknown, { id }: { id: number }, { loggedInUser }) => {
        try {
          const photo = await client.photo.findUnique({ where: { id } });

          if (!photo) {
            throw new Error('photo is not founded');
          }

          const like = await client.like.findUnique({
            where: {
              photoId_userId: {
                userId: loggedInUser.id,
                photoId: id,
              },
            },
          });

          if (like) {
            // unlike
            await client.like.delete({ where: { id: like.id } });
          } else {
            // like
            await client.like.create({
              data: { photoId: id, userId: loggedInUser.id },
            });
          }

          return { ok: true, isLiked: !Boolean(like) };
        } catch (e) {
          return { ok: false, error: e instanceof Error && e.message };
        }
      }
    ),
  },
};
