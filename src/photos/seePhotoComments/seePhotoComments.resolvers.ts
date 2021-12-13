import client from '../../client';

const LIMIT = 5;

interface IArgs {
  id: number;
  page?: number;
}

export default {
  Query: {
    seePhotoComments: (_: unknown, { id, page = 0 }: IArgs) => {
      return client.photo.findMany({
        where: { id },
        orderBy: { createdAt: 'asc' },
        take: LIMIT,
        skip: page * LIMIT,
      });
    },
  },
};
