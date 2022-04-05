import { api } from './utils';

import { ListOptionsYearData } from 'types/transportStore';
import { YearsSlugs } from 'models/transportModels';

const getYears = async ({ brandSlug, modelSlug }: YearsSlugs) => {
  const { data } = await api.get<ListOptionsYearData[]>(
    `/transport/brands/${brandSlug}/models/${modelSlug}/years/`,
  );

  return data;
};

export { getYears };
