import { createAction } from '@reduxjs/toolkit';

import {
  getBrands,
  getModel,
  getYears,
  getEngines,
  getTransportInfo,
} from 'api/routes/transport';

import {
  BrandSlug,
  YearsSlugs,
  EnginesSlugs,
  ListOptionsItemData,
  TransportInfoRequestData,
  TransportInfoResponseData,
} from 'api/models/transport';
import { createAsyncAction } from 'utility/helpers/store';
import { TransportIdData } from './types';

const fetchBrands = createAsyncAction<ListOptionsItemData[]>({
  typeAction: 'transport/fetchBrands',
  request: getBrands,
});

const fetchModels = createAsyncAction<ListOptionsItemData[], BrandSlug>({
  typeAction: 'transport/fetchModel',
  request: getModel,
});

const fetchYears = createAsyncAction<string[], YearsSlugs>({
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

const resetBrands = createAction('resetBrands');
const resetModels = createAction('resetModels');
const resetYears = createAction('resetYears');
const resetEngines = createAction('resetEngines');

const resetOptionsDataInBrandStep = createAction('resetOptionsDataInBrandStep');
const resetOptionsDataInModelStep = createAction('resetOptionsDataInModelStep');
const resetOptionsDataInYearStep = createAction('resetOptionsDataInYearStep');
const resetOptionsDataInEngineStep = createAction(
  'resetOptionsDataInEngineStep',
);

const setTransportId = createAction<TransportIdData>('setTransportSlugs');
const clearTransportId = createAction('clearTransportId');

export {
  fetchBrands,
  fetchModels,
  fetchYears,
  fetchEngines,
  fetchTransportInfo,
  resetBrands,
  resetModels,
  resetYears,
  resetEngines,
  resetOptionsDataInBrandStep,
  resetOptionsDataInModelStep,
  resetOptionsDataInYearStep,
  resetOptionsDataInEngineStep,
  setTransportId,
  clearTransportId,
};

//TODO: удалить после теста со всех редьюсеров

// const fetchBrands = createAsyncThunk('transport/fetchBrands', async () => {
//   const data = await getBrands();

//   return data;
// });

// const fetchModels = createAsyncThunk(
//   'transport/fetchModel',
//   async ({ transportType, brandSlug }: BrandSlug) => {
//     const data = await getModel({ transportType, brandSlug });

//     return data;
//   },
// );

// const fetchYears = createAsyncThunk(
//   'transport/fetchYears',
//   async ({ transportType, brandSlug, modelSlug }: YearsSlugs) => {
//     const data = await getYears({ transportType, brandSlug, modelSlug });

//     return data;
//   },
// );

// const fetchEngines = createAsyncThunk(
//   'transport/fetchEngines',
//   async ({ transportType, brandSlug, yearSlug, modelSlug }: EnginesSlugs) => {
//     const data = await getEngines({
//       transportType,
//       brandSlug,
//       yearSlug,
//       modelSlug,
//     });

//     return data;
//   },
// );

// const fetchTransportInfo = createAsyncThunk(
//   'transport/fetchTransportInfo',
//   async ({ transportId }: TransportInfoRequestData) => {
//     const data = await getTransportInfo({ transportId });

//     return data;
//   },
// );
