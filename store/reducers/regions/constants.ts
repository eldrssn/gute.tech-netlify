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
  selectedCity: '',
};

export { initialState };
