import { Prisma } from '@prisma/client';

export default {
  Mutation: {
    editProfile: (_: never, data: Prisma.UserUpdateInput) => {
      console.log(data);
      return { ok: true };
    },
  },
};
