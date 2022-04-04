import { api } from './utils';

const getBrands = async () => {
  const { data } = await api.get('/transport/brands/');

  return data;
};

export { getBrands };
