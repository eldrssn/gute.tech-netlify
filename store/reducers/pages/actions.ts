import { getPagesMenu, getPage } from 'api/routes/pages';
import { PageSlug, PageMenuItemData, PageData } from 'api/models/pages';
import { createAsyncAction } from 'utility/helpers/store';

const fetchPagesMenu = createAsyncAction<PageMenuItemData[]>({
  typeAction: 'pages/fetchPagesMenu',
  request: getPagesMenu,
});

const fetchPage = createAsyncAction<PageData, PageSlug>({
  typeAction: 'pages/fetchPage',
  request: getPage,
});

export { fetchPagesMenu, fetchPage };

//TODO: удалить после теста со всех редьюсеров

// const fetchPagesMenu = createAsyncThunk('pages/fetchPagesMenu', async () => {
//   const data = await getPagesMenu();

//   return data;
// });

// const fetchPage = createAsyncThunk(
//   'pages/fetchPage',
//   async ({ slug }: PageSlug) => {
//     const data = await getPage({ slug });

//     return data;
//   },
// );
