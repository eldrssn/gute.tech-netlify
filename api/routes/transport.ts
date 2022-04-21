import { sendRequest } from '../utils';

import {
  EnginesSlugs,
  BrandSlug,
  YearsSlugs,
  ListOptionsYearData,
  ListOptionsItemData,
} from '../models/transport';

const getBrands = () =>
  sendRequest<ListOptionsItemData[]>({
    url: `/transport/brands/`,
    method: 'get',
  });

const getModel = ({ brandSlug }: BrandSlug) =>
  sendRequest<ListOptionsItemData[]>({
    url: `/transport/brands/${brandSlug}/models/`,
    method: 'get',
  });

const getYears = ({ brandSlug, modelSlug }: YearsSlugs) =>
  sendRequest<ListOptionsYearData[]>({
    url: `/transport/brands/${brandSlug}/models/${modelSlug}/years/`,
    method: 'get',
  });

const getEngines = ({ brandSlug, modelSlug, yearSlug }: EnginesSlugs) =>
  sendRequest<ListOptionsItemData[]>({
    url: `/transport/brands/${brandSlug}/models/${modelSlug}/years/${yearSlug}/engines/`,
    method: 'get',
  });

export { getModel, getEngines, getBrands, getYears };
