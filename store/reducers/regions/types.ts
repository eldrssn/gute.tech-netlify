import { StoreState, StoreError, ErrorAction } from 'store/types';
import { RegionData, BranchesData } from 'api/models/regions';

enum RegionsStoreBlocks {
  REGIONS = 'regions',
  BRANCHES = 'branches',
  SELECTED_BRANCH_ID = 'selectedBranchId',
  SELECTED_CITY_SLUG = 'selectedCitySlug',
}

type BranchesState = {
  data: BranchesData[];
} & StoreState;

type RegionsState = {
  data: RegionData[];
} & StoreState;

type SelectedBranchId = number;
type SelectedCitySlug = string;

type RegionsStore = {
  [RegionsStoreBlocks.REGIONS]: RegionsState;
  [RegionsStoreBlocks.BRANCHES]: BranchesState;
  [RegionsStoreBlocks.SELECTED_BRANCH_ID]: SelectedBranchId;
  [RegionsStoreBlocks.SELECTED_CITY_SLUG]: SelectedCitySlug;
};

export type {
  ErrorAction,
  StoreError,
  RegionsStore,
  RegionData,
  SelectedBranchId,
  SelectedCitySlug,
  BranchesData,
};
