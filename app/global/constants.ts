import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { CategoryType } from './types';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const categories: CategoryType[] = [
  {
    label: 'Beach',
    description: 'This property is close to the beach',
    icon: TbBeach
  },
  {
    label: 'Windmills',
    description: 'This property has windmills',
    icon: GiWindmill
  },
  {
    label: 'Modern',
    description: 'This property is modern!',
    icon: MdOutlineVilla
  },
  {
    label: 'Countryside',
    description: 'This property is in the countryside!',
    icon: TbMountain
  },
  {
    label: 'Pools',
    description: 'This is property has a beautiful pool!',
    icon: TbPool
  },
  {
    label: 'Islands',
    description: 'This property is on an island!',
    icon: GiIsland
  },
  {
    label: 'Lake',
    description: 'This property is near a lake!',
    icon: GiBoatFishing
  },
  {
    label: 'Skiing',
    description: 'This property has skiing activities!',
    icon: FaSkiing
  },
  {
    label: 'Castles',
    description: 'This property is an ancient castle!',
    icon: GiCastle
  },
  {
    label: 'Caves',
    description: 'This property is in a spooky cave!',
    icon: GiCaveEntrance
  },
  {
    label: 'Camping',
    description: 'This property offers camping activities!',
    icon: GiForestCamp
  },
  {
    label: 'Arctic',
    description: 'This property is in arctic environment!',
    icon: BsSnow
  },
  {
    label: 'Desert',
    description: 'This property is in the desert!',
    icon: GiCactus
  },
  {
    label: 'Barns',
    description: 'This property is in a barn!',
    icon: GiBarn
  },
  {
    label: 'Lux',
    description: 'This property is brand new and luxurious!',
    icon: IoDiamond
  }
];
