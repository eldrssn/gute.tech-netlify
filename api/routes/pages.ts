import { sendRequest } from '../utils';

import { ApiMethods } from 'constants/types';

import { PageMenuItemData, PageSlug, PageData } from '../models/pages';

const getPagesMenu = () =>
  sendRequest<PageMenuItemData[]>({
    url: `/v1/pages/menu/`,
    method: ApiMethods.GET,
  });

const getPage = ({ slug }: PageSlug) =>
  sendRequest<PageData>({
    url: `/v1/pages/${slug}/`,
    method: ApiMethods.GET,
  });

export { getPagesMenu, getPage };
