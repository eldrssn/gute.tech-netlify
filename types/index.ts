import type { AppProps } from 'next/app';
import { FiltersCategoryResponseData } from 'api/models/catalog';

export type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout: React.ComponentType;
  };
};

export type Filter = {
  filter: FiltersCategoryResponseData;
};
