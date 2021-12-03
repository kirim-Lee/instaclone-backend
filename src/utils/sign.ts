import * as jwt from 'jsonwebtoken';

const privateKey = process.env.PRIVATE_KEY;

export function sign(id: number): string | null {
  if (typeof privateKey === 'string') {
    return jwt.sign({ id }, privateKey);
  } else {
    return null;
  }
}
