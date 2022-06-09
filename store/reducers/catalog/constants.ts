import { CatalogStore } from './types';

const initProductList = {
  current: '',
  total: '',
  pages: '',
  results: [],
};

const initialState: CatalogStore = {
  transportReadCategories: {
    data: [],
    isLoading: false,
    error: null,
  },
  transportProductList: {
    data: null,
    isLoading: false,
    error: null,
  },
  transportFilterList: {
    data: [],
    isLoading: false,
    error: null,
  },
  categoriesList: {
    data: [],
    isLoading: false,
    error: null,
  },
  categoriesTreeList: {
    data: [],
    isLoading: false,
    error: null,
  },
  categoriesFilterList: {
    data: [],
    isLoading: false,
    error: null,
  },
  categoriesProductList: {
    data: null,
    isLoading: false,
    error: null,
  },
  categoriesProductRead: {
    data: null,
    isLoading: false,
    error: null,
  },
  categoriesSubcategoriesList: {
    data: [],
    isLoading: false,
    error: null,
  },
  catalogSearchRead: {
    data: null,
    isLoading: false,
    error: null,
  },
};

export { initProductList, initialState };
