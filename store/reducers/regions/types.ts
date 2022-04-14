import { StoreState, StoreError, ErrorAction } from 'store/types';
import { RegionData } from 'api/models/regions';

enum RegionsStoreBlocks {
  REGIONS = 'regions',
  SELECTEDCITY = 'selectedCity',
}

type RegionsState = {
  data: RegionData[];
} & StoreState;

type SelectedCity = string;

type RegionsStore = {
  [RegionsStoreBlocks.REGIONS]: RegionsState;
  [RegionsStoreBlocks.SELECTEDCITY]: SelectedCity;
};

export type { ErrorAction, StoreError, RegionsStore, RegionData, SelectedCity };
