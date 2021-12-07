import { User } from '@prisma/client';
import { IContext } from '../@types/common';
import client from '../client';

// computed fields
export default {
  User: {
    totalFollowing: async ({ id }: User) => {
      return await client.user.count({
        where: { followers: { some: { id } } },
      });
    },
    totalFollowers: async ({ id }: User) => {
      return await client.user.count({
        where: { following: { some: { id } } },
      });
    },
    isMe: ({ id }: User, _: unknown, { loggedInUser }: IContext) => {
      return loggedInUser?.id === id;
    },
    isFollowing: async (
      { id }: User,
      _: unknown,
      { loggedInUser }: IContext
    ) => {
      const user = await client.user.count({
        where: { id, followers: { some: { id: loggedInUser?.id } } },
      });
      return Boolean(user);
    },
  },
};
