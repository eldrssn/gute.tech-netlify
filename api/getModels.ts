import { api } from './utils';

import { BrandSlug } from 'types/transportStore';

const getModel = async ({ brandSlug }: BrandSlug) => {
  const { data } = await api.get(`/transport/brands/${brandSlug}/models/`);

  return data;
};

export { getModel };
