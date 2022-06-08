import { NextRouter } from 'next/router';
import { TreeCategoryResponseData } from 'api/models/catalog';

type Crumb = {
  href: string;
  text?: string;
};

type GetCrumbs = (
  router: NextRouter,
  paths: Record<string, string>,
  lastTitle?: string,
) => Crumb[];

type UseBreadcrumbs = {
  router: NextRouter;
  data?: TreeCategoryResponseData[];
  isQuery?: boolean;
  lastTitle?: string;
};

export type { GetCrumbs, UseBreadcrumbs, Crumb };
