import client from '../../client';

export default {
  Query: {
    seePhotoLikes: async (_: unknown, { id }: { id: number }) => {
      const likes = await client.like.findMany({
        where: { photoId: id },
        select: { user: true },
      });

      return likes.map((like) => like.user);
    },
  },
};
