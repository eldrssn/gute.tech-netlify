import { RegionsStore } from './types';

const initialState: RegionsStore = {
  regions: {
    data: [],
    isLoading: false,
    error: null,
  },
  branches: {
    data: [],
    isLoading: false,
    error: null,
  },
  selectedBranchId: 0,
  selectedCitySlug: '',
};

export { initialState };
