import { getShowcase } from 'api/routes/showcase';
import { ShowcaseResponseData } from 'api/models/showcase';
import { createAsyncAction } from 'utility/helpers/store';

const fetchShowcase = createAsyncAction<ShowcaseResponseData>({
  typeAction: 'showcaseStore/fetchShowcase',
  request: getShowcase,
});

export { fetchShowcase };
