import client from '../client';
import { verify } from './sign';

export const getUser = async (token?: string) => {
  try {
    const id = verify(token);
    if (!id) {
      return null;
    }
    const user = await client.user.findUnique({ where: { id } });
    return user;
  } catch (e) {
    console.log(e);

    return null;
  }
};
