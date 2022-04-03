import { api } from './utils';

import { EnginesSlugs } from 'store/reducers/transport/types';

const getEngines = async ({ brandSlug, yearSlug, modelSlug }: EnginesSlugs) => {
  const { data } = await api.get(
    `/transport/brands/${brandSlug}/models/${modelSlug}/years/${yearSlug}/engines/`,
  );

  return data;
};

export { getEngines };
