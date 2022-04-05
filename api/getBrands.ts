import { api } from './utils';

import { ListOptionsItemData } from 'types/transportStore';

const getBrands = async () => {
  const { data } = await api.get<ListOptionsItemData[]>('/transport/brands/');

  return data;
};

export { getBrands };
