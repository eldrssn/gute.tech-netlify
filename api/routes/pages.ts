import { sendRequest } from '../utils';

import { PageMenuItemData, PageSlug, PageData } from '../models/pages';

const getPagesMenu = () =>
  sendRequest<PageMenuItemData[]>({
    url: `/pages/menu/`,
    method: 'get',
  });

const getPage = ({ slug }: PageSlug) =>
  sendRequest<PageData>({
    url: `/pages/${slug}/`,
    method: 'get',
  });

export { getPagesMenu, getPage };
