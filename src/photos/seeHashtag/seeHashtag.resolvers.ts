import client from '../../client';

interface IArgs {
  hashtag: string;
}
export default {
  Query: {
    seeHashtag: (_: unknown, { hashtag }: IArgs) => {
      return client.hashtag.findUnique({ where: { hashtag } });
    },
  },
};
