import * as jwt from 'jsonwebtoken';

const privateKey = process.env.PRIVATE_KEY;

export function sign(id: number): string | null {
  if (typeof privateKey === 'string') {
    return jwt.sign({ id }, privateKey);
  } else {
    return null;
  }
}

export function verify(token?: string): number | null {
  if (typeof privateKey === 'string' && token) {
    const verified = jwt.verify(token, privateKey) || {};
    return typeof verified === 'object' && 'id' in verified
      ? verified.id
      : null;
  } else {
    return null;
  }
}
