import { Comment } from '@prisma/client';
import { IContext } from '../@types/common';

export default {
  Comment: {
    isMine: ({ userId }: Comment, _: never, { loggedInUser }: IContext) => {
      return userId === loggedInUser?.id;
    },
  },
};
