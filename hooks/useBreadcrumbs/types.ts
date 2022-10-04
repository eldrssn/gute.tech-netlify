import { NextRouter } from 'next/router';
import { TreeCategoryResponseData } from 'api/models/catalog';

type Crumb = {
  href: string;
  text?: string;
};

type TCrumbs = {
  router: NextRouter;
  paths: Record<string, string>;
  lastTitle?: string;
  transportId?: string;
  isAddDefaultPaths?: boolean;
};

type UseBreadcrumbs = {
  router: NextRouter;
  data?: TreeCategoryResponseData[];
  lastTitle?: string;
  transportId?: string;
  isAddDefaultPaths?: boolean;
};

export type { TCrumbs, UseBreadcrumbs, Crumb };
