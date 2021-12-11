import { Photo } from '@prisma/client';
import client from '../client';

export default {
  Photo: {
    user: (photo: Photo) => {
      return client.user.findUnique({ where: { id: photo.userId } });
    },
    hashtags: (photo: Photo) => {
      return client.hashtag.findMany({
        where: { photos: { some: { id: photo.id } } },
      });
    },
  },
};
