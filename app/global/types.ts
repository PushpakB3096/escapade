import { Listing, User } from '@prisma/client';
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

// for hydration issues
export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export interface CategoryType {
  label: string;
  description: string;
  icon: IconType;
}

export type CountrySelectValue = {
  flag: string;
  label: string;
  // TODO: this will be a tuple?
  latlng: number[];
  region: string;
  value: string;
};
