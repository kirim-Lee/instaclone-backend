import client from '../../client';
import { protect } from '../../utils/user';

interface IArgs {
  photoId: number;
  payload: string;
}
export default {
  Mutation: {
    createComment: protect(
      async (_: unknown, { photoId, payload }: IArgs, { loggedInUser }) => {
        try {
          const photo = await client.photo.findUnique({
            where: { id: photoId },
            select: { id: true },
          });
          if (!photo) {
            throw new Error('photo is not exist');
          }

          await client.comment.create({
            data: { userId: loggedInUser.id, photoId, payload },
          });

          return { ok: true };
        } catch (e) {
          return { ok: false, error: e instanceof Error && e.message };
        }
      }
    ),
  },
};
