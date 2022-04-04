import { NextRouter } from 'next/router';
import { CatalogChild } from 'types/catalog';

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
  data?: CatalogChild[],
  isQuery?: boolean,
) => Crumb[];
