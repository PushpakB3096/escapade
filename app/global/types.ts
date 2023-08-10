import { User } from '@prisma/client';
import { IconType } from 'react-icons';

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

export interface CategoryType {
  label: string;
  description: string;
  icon: IconType;
}
