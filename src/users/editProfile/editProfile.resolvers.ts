import { User } from '@prisma/client';
import { IContext } from '../../@types/common';
import client from '../../client';
import { hashPassword } from '../../utils/hash';
import { protect } from '../../utils/user';
import { GraphQLUpload, processRequest } from 'graphql-upload';

export default {
  Upload: GraphQLUpload,

  Mutation: {
    editProfile: protect(
      async (
        _: unknown,
        { password, ...user }: User,
        { loggedInUser }: IContext
      ) => {
        try {
          const hashed = password ? await hashPassword(password) : null;

          const updateData: Partial<User> = user;

          if (hashed) {
            updateData.password = hashed;
          }

          const result = await client.user.update({
            where: { id: loggedInUser.id },
            data: updateData,
          });

          if (!result) {
            throw new Error('occure error by update user info');
          }

          return { ok: true };
        } catch (e) {
          console.log(e);

          return { ok: false, error: e instanceof Error && e.message };
        }
      }
    ),
  },
};
