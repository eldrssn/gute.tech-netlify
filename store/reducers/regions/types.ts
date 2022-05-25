import { StoreState, StoreError, ErrorAction } from 'store/types';
import { RegionData, BranchesData } from 'api/models/regions';

enum RegionsStoreBlocks {
  REGIONS = 'regions',
  BRANCHES = 'branches',
  SELECTED_CITY = 'selectedCity',
}

type BranchesState = {
  data: BranchesData[];
} & StoreState;

type RegionsState = {
  data: RegionData[];
} & StoreState;

type SelectedCity = string;

type RegionsStore = {
  [RegionsStoreBlocks.REGIONS]: RegionsState;
  [RegionsStoreBlocks.BRANCHES]: BranchesState;
  [RegionsStoreBlocks.SELECTED_CITY]: SelectedCity;
};

export type {
  ErrorAction,
  StoreError,
  RegionsStore,
  RegionData,
  SelectedCity,
  BranchesData,
};
