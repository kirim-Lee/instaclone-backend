import { IContext } from '../@types/common';
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

type ResolverFn<T, R> = (
  root: unknown,
  args: T,
  context: IContext,
  info: any
) => R;

export const protect =
  <T extends {}, R extends {}>(resolver: ResolverFn<T, R>) =>
  (root: unknown, args: T, context: IContext, info: any) => {
    if (!context.loggedInUser) {
      return { ok: false, error: 'you should login' };
    }

    return resolver(root, args, context, info);
  };
