import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';

const upload = async (file: Promise<FileUpload>, prefix: string | number) => {
  const result = await file;
  const filename = `${prefix}-${Date.now()}-${result.filename}`;

  const stream = result.createReadStream();
  const dest = createWriteStream(`${process.cwd()}/upload/${filename}`);
  stream.pipe(dest);

  return filename;
};

export default upload;
