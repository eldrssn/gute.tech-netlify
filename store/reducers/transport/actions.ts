import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

import { getBrands } from 'api/getBrands';
import { getModel } from 'api/getModels';
import { getYears } from 'api/getYears';
import { getEngines } from 'api/getEngines';

import { BrandSlug, YearsSlugs, EnginesSlugs } from 'models/transportModels';

const fetchBrands = createAsyncThunk('ContentStore/fetchBrands', async () => {
  const data = await getBrands();

  return data;
});

const fetchModels = createAsyncThunk(
  'ContentStore/fetchModel',
  async ({ brandSlug }: BrandSlug) => {
    const data = await getModel({ brandSlug });

    return data;
  },
);

const fetchYears = createAsyncThunk(
  'ContentStore/fetchYears',
  async ({ brandSlug, modelSlug }: YearsSlugs) => {
    const data = await getYears({ brandSlug, modelSlug });

    return data;
  },
);

const fetchEngines = createAsyncThunk(
  'ContentStore/fetchEngines',
  async ({ brandSlug, yearSlug, modelSlug }: EnginesSlugs) => {
    const data = await getEngines({ brandSlug, yearSlug, modelSlug });

    return data;
  },
);

const resetBrands = createAction('resetBrands');
const resetModels = createAction('resetModels');
const resetYears = createAction('resetYears');
const resetEngines = createAction('resetEngines');

export {
  fetchBrands,
  fetchModels,
  fetchYears,
  fetchEngines,
  resetBrands,
  resetModels,
  resetYears,
  resetEngines,
};
