import { createAsyncThunk } from '@reduxjs/toolkit';

import { getShowcase } from 'api/routes/showcase';

const fetchShowcase = createAsyncThunk(
  'showcaseStore/fetchShowcase',
  async () => {
    const data = await getShowcase();

    return data;
  },
);

export { fetchShowcase };
