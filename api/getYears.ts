import { api } from './utils';

import { YearsSlugs } from 'types/transportStore';

const getYears = async ({ brandSlug, modelSlug }: YearsSlugs) => {
  const { data } = await api.get(
    `/transport/brands/${brandSlug}/models/${modelSlug}/years/`,
  );

  return data;
};

export { getYears };
