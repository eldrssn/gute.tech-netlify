import { api } from './utils';

import { ListOptionsItemData } from 'types/transportStore';
import { BrandSlug } from 'models/transportModels';

const getModel = async ({ brandSlug }: BrandSlug) => {
  const { data } = await api.get<ListOptionsItemData[]>(
    `/transport/brands/${brandSlug}/models/`,
  );

  return data;
};

export { getModel };
