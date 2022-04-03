import { api } from './utils';

import { BrandSlug } from 'store/reducers/transport/types';

const getModel = async ({ brandSlug }: BrandSlug) => {
  const { data } = await api.get(`/transport/brands/${brandSlug}/models/`);

  return data;
};

export { getModel };
