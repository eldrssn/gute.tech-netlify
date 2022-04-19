import { sendRequest } from '../utils';

import { PageMenuItemData, PageSlug, PageData } from '../models/pages';

const getPagesMenu = () =>
  sendRequest<PageMenuItemData[]>({
    path: `/pages/menu/`,
    method: 'get',
  });

const getPage = ({ slug }: PageSlug) =>
  sendRequest<PageData>({
    path: `/pages/${slug}/`,
    method: 'get',
  });

export { getPagesMenu, getPage };
