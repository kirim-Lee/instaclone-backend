import client from '../../client';

interface IArgs {
  keyword: string;
  page?: number;
}

const LIMIT = 5;

export default {
  Query: {
    searchPhotos: (_: unknown, { keyword, page = 0 }: IArgs) =>
      client.photo.findMany({
        where: { caption: { contains: keyword } },
        skip: page * LIMIT,
        take: LIMIT,
      }),
  },
};
