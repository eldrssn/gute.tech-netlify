// import { getShowcase } from 'api/routes/showcase';
import { ShowcaseResponseData } from 'api/models/showcase';
// import { createAsyncAction } from 'utility/helpers/store';
import { createAction } from '@reduxjs/toolkit';

// TODO: оттестить и поправить
// const fetchShowcase = createAsyncAction<ShowcaseResponseData>({
//   typeAction: 'showcaseStore/fetchShowcase',
//   request: getShowcase,
// });

const fetchShowcase = createAction<ShowcaseResponseData>(
  'showcaseStore/fetchShowcase',
);

export { fetchShowcase };
