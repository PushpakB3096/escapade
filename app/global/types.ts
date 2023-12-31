import { Listing, Reservation, User } from '@prisma/client';
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

// for hydration issues
export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export interface CategoryType {
  label: string;
  description: string;
  icon: IconType;
}

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: [number, number];
  region: string;
  value: string;
};

export enum STEPS_FOR_RENTING {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

export enum STEPS_FOR_SEARCH {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}