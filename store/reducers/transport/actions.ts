import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

import {
  getBrands,
  getModel,
  getYears,
  getEngines,
} from 'api/routes/transport';

import { BrandSlug, YearsSlugs, EnginesSlugs } from 'api/models/transport';

const fetchBrands = createAsyncThunk('transport/fetchBrands', async () => {
  const data = await getBrands();

  return data;
});

const fetchModels = createAsyncThunk(
  'transport/fetchModel',
  async ({ transportType, brandSlug }: BrandSlug) => {
    const data = await getModel({ transportType, brandSlug });

    return data;
  },
);

const fetchYears = createAsyncThunk(
  'transport/fetchYears',
  async ({ transportType, brandSlug, modelSlug }: YearsSlugs) => {
    const data = await getYears({ transportType, brandSlug, modelSlug });

    return data;
  },
);

const fetchEngines = createAsyncThunk(
  'transport/fetchEngines',
  async ({ transportType, brandSlug, yearSlug, modelSlug }: EnginesSlugs) => {
    const data = await getEngines({
      transportType,
      brandSlug,
      yearSlug,
      modelSlug,
    });

    return data;
  },
);

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

export {
  fetchBrands,
  fetchModels,
  fetchYears,
  fetchEngines,
  resetBrands,
  resetModels,
  resetYears,
  resetEngines,
  resetOptionsDataInBrandStep,
  resetOptionsDataInModelStep,
  resetOptionsDataInYearStep,
  resetOptionsDataInEngineStep,
};
