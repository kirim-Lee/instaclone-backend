// import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import AWS from 'aws-sdk';

// const upload = async (file: Promise<FileUpload>, prefix: string | number) => {
//   const result = await file;
//   const filename = `${prefix}-${Date.now()}-${result.filename}`;

//   const stream = result.createReadStream();
//   const dest = createWriteStream(`${process.cwd()}/upload/${filename}`);
//   stream.pipe(dest);

//   return filename;
// };

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY ?? '',
    secretAccessKey: process.env.AWS_SECRET ?? '',
  },
});

const upload = async (
  file: Promise<FileUpload>,
  prefix: string | number,
  folderName: string
) => {
  const result = await file;
  const filename = `${folderName}/${prefix}-${Date.now()}-${result.filename}`;
  const s3 = new AWS.S3();

  const uploadResult = await s3
    .upload({
      Body: result.createReadStream(),
      Bucket: 'instaclone-kirim',
      Key: filename,
      ACL: 'public-read',
    })
    .promise();

  return uploadResult.Location;
};

export default upload;
