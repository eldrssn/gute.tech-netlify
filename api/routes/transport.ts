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
    path: `/transport/brands/`,
    method: 'get',
  });

const getModel = ({ brandSlug }: BrandSlug) =>
  sendRequest<ListOptionsItemData[]>({
    path: `/transport/brands/${brandSlug}/models/`,
    method: 'get',
  });

const getYears = ({ brandSlug, modelSlug }: YearsSlugs) =>
  sendRequest<ListOptionsYearData[]>({
    path: `/transport/brands/${brandSlug}/models/${modelSlug}/years/`,
    method: 'get',
  });

const getEngines = ({ brandSlug, modelSlug, yearSlug }: EnginesSlugs) =>
  sendRequest<ListOptionsItemData[]>({
    path: `/transport/brands/${brandSlug}/models/${modelSlug}/years/${yearSlug}/engines/`,
    method: 'get',
  });

export { getModel, getEngines, getBrands, getYears };
