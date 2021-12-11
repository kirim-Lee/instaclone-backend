import { Hashtag, Photo } from '@prisma/client';
import client from '../client';

const LIMIT = 5;

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
  Hashtag: {
    photos: ({ id }: Hashtag, { page }: { page: number }) => {
      return client.hashtag
        .findUnique({ where: { id } })
        .photos({ take: LIMIT, skip: LIMIT * page });
    },
    totalPhotos: ({ hashtag }: Hashtag) => {
      return client.photo.count({
        where: { hashtags: { some: { hashtag } } },
      });
    },
  },
};
