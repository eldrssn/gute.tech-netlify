import { sendRequest, sendRequestV2 } from '../utils';

import { ApiMethods } from 'constants/types';

import {
  EnginesSlugs,
  BrandsSlug,
  ModelsSlug,
  ListOptionsYearData,
  ListOptionsItemData,
  TransportInfoResponseData,
  TransportInfoRequestData,
} from '../models/transport';

// V1 requests

// const getBrands = () =>
//   sendRequest<ListOptionsItemData[]>({
//     url: `/transport/brands/`,
//     method: ApiMethods.GET,
//   });

// const getModel = ({ transportType, brandSlug }: BrandSlug) =>
//   sendRequest<ListOptionsItemData[]>({
//     url: `/transport/${transportType}/${brandSlug}/models/`,
//     method: ApiMethods.GET,
//   });

// const getYears = ({ transportType, brandSlug, modelSlug }: YearsSlugs) =>
//   sendRequest<ListOptionsYearData[]>({
//     url: `/transport/${transportType}/${brandSlug}/${modelSlug}/years/`,
//     method: ApiMethods.GET,
//   });

// const getEngines = ({
//   transportType,
//   brandSlug,
//   modelSlug,
//   yearSlug,
// }: EnginesSlugs) =>
//   sendRequest<ListOptionsItemData[]>({
//     url: `/transport/${transportType}/${brandSlug}/${modelSlug}/${yearSlug}/engines/`,
//     method: ApiMethods.GET,
//   });

const getBrands = ({ yearSlug }: BrandsSlug) =>
  sendRequestV2<ListOptionsItemData[]>({
    url: `/transport/${yearSlug}/brands/`,
    method: ApiMethods.GET,
  });

const getModel = ({ transportTypeSlug, brandSlug, yearSlug }: ModelsSlug) =>
  sendRequestV2<ListOptionsItemData[]>({
    url: `/transport/${yearSlug}/${transportTypeSlug}/${brandSlug}/models/`,
    method: ApiMethods.GET,
  });

const getYears = () =>
  sendRequestV2<ListOptionsYearData[]>({
    url: `/transport/years/`,
    method: ApiMethods.GET,
  });

const getEngines = ({
  transportTypeSlug,
  brandSlug,
  modelSlug,
  yearSlug,
}: EnginesSlugs) =>
  sendRequestV2<ListOptionsItemData[]>({
    url: `/transport/${yearSlug}/${transportTypeSlug}/${brandSlug}/${modelSlug}/engines/`,
    method: ApiMethods.GET,
  });

const getTransportInfo = ({ transportId }: TransportInfoRequestData) =>
  sendRequest<TransportInfoResponseData>({
    url: `/transport/${transportId}/`,
    method: ApiMethods.GET,
  });

export { getModel, getEngines, getBrands, getYears, getTransportInfo };
