import { api } from './utils';

import { CarDetailsItemData } from 'store/reducers/transport/types';

const getBrands = async () => {
  const { data } = await api.get<CarDetailsItemData[]>('/transport/brands/');

  return data;
};

export { getBrands };
