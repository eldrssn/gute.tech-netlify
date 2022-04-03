import { api } from './utils';

import { YearsSlugs } from 'store/reducers/transport/types';

const getYears = async ({ brandSlug, modelSlug }: YearsSlugs) => {
  const { data } = await api.get(
    `/transport/brands/${brandSlug}/models/${modelSlug}/years/`,
  );

  return data;
};

export { getYears };
