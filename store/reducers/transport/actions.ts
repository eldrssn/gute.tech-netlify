import { createAction } from '@reduxjs/toolkit';

import {
  getBrands,
  getModel,
  getYears,
  getEngines,
  getTransportInfo,
} from 'api/routes/transport';

import {
  BrandsSlug,
  ModelsSlug,
  EnginesSlugs,
  ListOptionsItemData,
  TransportInfoRequestData,
  TransportInfoResponseData,
} from 'api/models/transport';
import { createAsyncAction } from 'utility/helpers/store';
import { TransportIdData, TransportYearData } from './types';

const fetchBrands = createAsyncAction<ListOptionsItemData[], BrandsSlug>({
  typeAction: 'transport/fetchBrands',
  request: getBrands,
});

const fetchModels = createAsyncAction<ListOptionsItemData[], ModelsSlug>({
  typeAction: 'transport/fetchModel',
  request: getModel,
});

const fetchYears = createAsyncAction<string[]>({
  typeAction: 'transport/fetchYears',
  request: getYears,
});

const fetchEngines = createAsyncAction<ListOptionsItemData[], EnginesSlugs>({
  typeAction: 'transport/fetchEngines',
  request: getEngines,
});

const fetchTransportInfo = createAsyncAction<
  TransportInfoResponseData,
  TransportInfoRequestData
>({
  typeAction: 'transport/fetchTransportInfo',
  request: getTransportInfo,
});

const resetOptionsWhenEditFilter = createAction('resetOptionsWhenEditFilter');

const resetTransportInfo = createAction('resetTransportInfo');

const resetBrands = createAction('resetBrands');
const resetModels = createAction('resetModels');
const resetYears = createAction('resetYears');
const resetEngines = createAction('resetEngines');

const resetOptionsDataInBrandStep = createAction('resetOptionsDataInBrandStep');
const resetOptionsDataInModelStep = createAction('resetOptionsDataInModelStep');
const resetOptionsDataInYearStep = createAction('resetOptionsDataInYearStep');

const setTransportYear = createAction<TransportYearData>('setTransportYear');
const clearTransportYear = createAction('clearTransportYear');
const setTransportId = createAction<TransportIdData>('setTransportSlugs');
const clearTransportId = createAction('clearTransportId');

export {
  fetchBrands,
  fetchModels,
  fetchYears,
  fetchEngines,
  fetchTransportInfo,
  resetTransportInfo,
  resetBrands,
  resetModels,
  resetYears,
  resetEngines,
  resetOptionsWhenEditFilter,
  resetOptionsDataInBrandStep,
  resetOptionsDataInModelStep,
  resetOptionsDataInYearStep,
  setTransportYear,
  clearTransportYear,
  setTransportId,
  clearTransportId,
};
