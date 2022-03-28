import { createAsyncThunk } from '@reduxjs/toolkit';

import { getBrands } from 'api/getBrands';
import { getModel } from 'api/getModel';

import { BrandSlug } from './types';

const fetchBrands = createAsyncThunk('ContentStore/fetchBrands', async () => {
  const data = await getBrands();

  return data;
});

const fetchModels = createAsyncThunk(
  'ContentStore/fetchModel',
  async ({ slug }: BrandSlug) => {
    const data = await getModel({ slug });

    return data;
  },
);

export { fetchBrands, fetchModels };
