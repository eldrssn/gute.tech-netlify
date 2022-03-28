import { api } from './utils';

import { BrandsData } from 'store/reducers/content/types';

const getBrands = async () => {
  const { data } = await api.get<BrandsData[]>('/brands/');

  return data;
};

export { getBrands };
