import { api } from './utils';

import { ListOptionsItemData } from 'types/transportStore';
import { EnginesSlugs } from 'models/transportModels';

const getEngines = async ({ brandSlug, yearSlug, modelSlug }: EnginesSlugs) => {
  const { data } = await api.get<ListOptionsItemData[]>(
    `/transport/brands/${brandSlug}/models/${modelSlug}/years/${yearSlug}/engines/`,
  );

  return data;
};

export { getEngines };
