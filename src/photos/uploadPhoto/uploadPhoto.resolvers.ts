import { FileUpload } from 'graphql-upload';
import client from '../../client';
import upload from '../../utils/upload';
import { protect } from '../../utils/user';

interface IArgs {
  file: Promise<FileUpload>;
  caption?: string;
}

const getHashtags = (caption?: string) => {
  const hashtags = /#[\w]+/g;
  return caption?.match(hashtags) || [];
};

export default {
  Mutation: {
    uploadPhoto: protect(
      async (_, { file, caption }: IArgs, { loggedInUser }) => {
        const filename = await upload(file, loggedInUser.id);

        return await client.photo.create({
          data: {
            file: filename,
            caption,
            user: { connect: { id: loggedInUser.id } },
            hashtags: {
              connectOrCreate: getHashtags(caption).map((hashtag) => ({
                where: { hashtag },
                create: { hashtag },
              })),
            },
          },
        });
      }
    ),
  },
};
