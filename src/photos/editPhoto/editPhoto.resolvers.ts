import client from '../../client';
import { getHashtags } from '../../utils/photo';
import { protect } from '../../utils/user';

interface IArg {
  id: number;
  caption: string;
}

export default {
  Mutation: {
    editPhoto: protect(
      async (_: unknown, { id, caption }: IArg, { loggedInUser }) => {
        try {
          const photo = await client.photo.findFirst({
            where: { id, userId: loggedInUser.id },
            include: { hashtags: true },
          });

          if (!photo) {
            throw new Error('photo is not exist');
          }

          await client.photo.update({
            where: { id },
            data: {
              caption,
              hashtags: {
                disconnect: photo.hashtags.map((hashtag) => ({
                  id: hashtag.id,
                })),
                connectOrCreate: getHashtags(caption).map((hashtag) => ({
                  where: { hashtag },
                  create: { hashtag },
                })),
              },
            },
          });

          return { ok: true };
        } catch (e) {
          return { ok: false, error: e instanceof Error && e.message };
        }
      }
    ),
  },
};
