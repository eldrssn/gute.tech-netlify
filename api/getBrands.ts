import { api } from './utils';

import { CarDetailsItemData } from 'store/reducers/content/types';

const getBrands = async () => {
  const { data } = await api.get<CarDetailsItemData[]>('/transport/brands/');

  return data;
};

export { getBrands };
