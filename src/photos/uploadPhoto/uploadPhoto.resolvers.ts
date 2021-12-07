import { FileUpload } from 'graphql-upload';
import upload from '../../utils/upload';
import { protect } from '../../utils/user';

interface IArgs {
  file: Promise<FileUpload>;
  caption?: string;
}

export default {
  Mutation: {
    uploadPhoto: protect(
      async (_, { file, caption }: IArgs, { loggedInUser }) => {
        const filename = await upload(file, loggedInUser.id);

        if (caption) {
          // parse caption
          // get or create hashtag
        }

        // save photo

        // add hashtag to photo
      }
    ),
  },
};
