import { NextRouter } from 'next/router';
import { TreeCategoryResponseData } from 'api/models/catalog';

type Crumb = {
  href: string;
  text?: string;
};

export type GetCrumbs = (
  router: NextRouter,
  paths: Record<string, string>,
) => Crumb[];

export type UseBreadcrumbs = (
  router: NextRouter,
  data?: TreeCategoryResponseData[],
  isQuery?: boolean,
) => Crumb[];
