import { api } from './utils';

import { EnginesSlugs } from 'types/transportStore';

const getEngines = async ({ brandSlug, yearSlug, modelSlug }: EnginesSlugs) => {
  const { data } = await api.get(
    `/transport/brands/${brandSlug}/models/${modelSlug}/years/${yearSlug}/engines/`,
  );

  return data;
};

export { getEngines };
