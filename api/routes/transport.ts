import { sendRequest } from '../utils';

import { ApiMethods } from 'constants/types';

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
    method: ApiMethods.GET,
  });

const getModel = ({ transportType, brandSlug }: BrandSlug) =>
  sendRequest<ListOptionsItemData[]>({
    url: `/transport/${transportType}/${brandSlug}/models/`,
    method: ApiMethods.GET,
  });

const getYears = ({ transportType, brandSlug, modelSlug }: YearsSlugs) =>
  sendRequest<ListOptionsYearData[]>({
    url: `/transport/${transportType}/${brandSlug}/${modelSlug}/years/`,
    method: ApiMethods.GET,
  });

const getEngines = ({
  transportType,
  brandSlug,
  modelSlug,
  yearSlug,
}: EnginesSlugs) =>
  sendRequest<ListOptionsItemData[]>({
    url: `/transport/${transportType}/${brandSlug}/${modelSlug}/${yearSlug}/engines/`,
    method: ApiMethods.GET,
  });

const getTransportInfo = ({ transportId }: TransportInfoRequestData) =>
  sendRequest<TransportInfoResponseData>({
    url: `/transport/${transportId}/`,
    method: ApiMethods.GET,
  });

export { getModel, getEngines, getBrands, getYears, getTransportInfo };
