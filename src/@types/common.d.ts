import { User } from '@prisma/client';

interface IContext {
  loggedInUser: User;
}
