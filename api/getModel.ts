import { api } from './utils';

import { BrandSlug } from 'store/reducers/content/types';

const getModel = async ({ slug }: BrandSlug) => {
  const { data } = await api.get(`/transport/brands/${slug}/models/`);

  return data;
};

export { getModel };
