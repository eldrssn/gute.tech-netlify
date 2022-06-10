import { TransportStore } from './types';

const initialState: TransportStore = {
  brands: {
    data: [],
    isLoading: false,
    error: null,
  },
  models: {
    data: [],
    isLoading: false,
    error: null,
  },
  years: {
    data: [],
    isLoading: false,
    error: null,
  },
  engines: {
    data: [],
    isLoading: false,
    error: null,
  },
  transportId: '',
  transportInfo: {
    data: null,
    isLoading: false,
    error: null,
  },
};

export { initialState };
