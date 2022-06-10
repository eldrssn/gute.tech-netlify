import { sendRequest } from '../utils';

import {
  EnginesSlugs,
  BrandSlug,
  YearsSlugs,
  ListOptionsYearData,
  ListOptionsItemData,
  TransportInfoResponseData,
  TransportInfoRequestData,
} from '../models/transport';

const getBrands = () =>
  sendRequest<ListOptionsItemData[]>({
    url: `/transport/brands/`,
    method: 'get',
  });

const getModel = ({ transportType, brandSlug }: BrandSlug) =>
  sendRequest<ListOptionsItemData[]>({
    url: `/transport/${transportType}/${brandSlug}/models/`,
    method: 'get',
  });

const getYears = ({ transportType, brandSlug, modelSlug }: YearsSlugs) =>
  sendRequest<ListOptionsYearData[]>({
    url: `/transport/${transportType}/${brandSlug}/${modelSlug}/years/`,
    method: 'get',
  });

const getEngines = ({
  transportType,
  brandSlug,
  modelSlug,
  yearSlug,
}: EnginesSlugs) =>
  sendRequest<ListOptionsItemData[]>({
    url: `/transport/${transportType}/${brandSlug}/${modelSlug}/${yearSlug}/engines/`,
    method: 'get',
  });

const getTransportInfo = ({ transportId }: TransportInfoRequestData) =>
  sendRequest<TransportInfoResponseData>({
    url: `/transport/${transportId}/`,
    method: 'get',
  });

export { getModel, getEngines, getBrands, getYears, getTransportInfo };
