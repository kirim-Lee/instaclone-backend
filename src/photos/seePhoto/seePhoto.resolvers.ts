import client from '../../client';

export default {
  Query: {
    seePhoto: async (_: unknown, { id }: { id: number }) => {
      return await client.photo.findUnique({ where: { id } });
    },
  },
};
