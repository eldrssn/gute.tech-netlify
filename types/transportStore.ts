import { StoreState } from 'store/types';

export type ListOptionsItemData = {
  title: string;
  slug: string;
};

export type ListOptionsYearData = string;

export type ListOptionsItem = {
  data: ListOptionsItemData[] | [];
} & StoreState;
