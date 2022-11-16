import { ProductStore } from './types';

const initProductList = {
  current: '',
  total: '',
  pages: '',
  results: [],
};

const initialState: ProductStore = {
  productRead: {
    data: null,
    isLoading: false,
    error: null,
  },
  productsListRecommended: {
    data: null,
    isLoading: false,
    error: null,
  },
  productBrandsList: {
    data: null,
    isLoading: false,
    error: null,
  },
  productModelsList: {
    data: null,
    isLoading: false,
    error: null,
  },
  productTransportList: {
    data: null,
    isLoading: false,
    error: null,
  },
  productYearsList: {
    data: null,
    isLoading: false,
    error: null,
  },
  productAnaloguesList: {
    data: null,
    isLoading: false,
    error: null,
  },
  productReviewsList: {
    data: null,
    isLoading: true,
    error: null,
  },
};

export { initProductList, initialState };
