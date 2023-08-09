import { User } from '@prisma/client';

export type NoOp = () => void;

// for hydration issues
export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
