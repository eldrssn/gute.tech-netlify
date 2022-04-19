import { createAsyncThunk } from '@reduxjs/toolkit';

import { getPagesMenu, getPage } from 'api/routes/pages';
import { PageSlug } from 'api/models/pages';

const fetchPagesMenu = createAsyncThunk('pages/fetchPagesMenu', async () => {
  const data = await getPagesMenu();

  return data;
});

const fetchPage = createAsyncThunk(
  'pages/fetchPage',
  async ({ slug }: PageSlug) => {
    const data = await getPage({ slug });

    return data;
  },
);

export { fetchPagesMenu, fetchPage };
