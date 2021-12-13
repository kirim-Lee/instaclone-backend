import { Hashtag, Photo } from '@prisma/client';
import { IContext } from '../@types/common';
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
    totalLikes: ({ id }: Photo) => {
      return client.like.count({ where: { photoId: id } });
    },
    totalComments: ({ id }: Photo) => {
      return client.comment.count({ where: { photoId: id } });
    },
    isMine: ({ userId }: Photo, _: never, { loggedInUser }: IContext) => {
      return userId === loggedInUser?.id;
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
