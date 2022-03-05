import { RouterQuery, RouterQueryOptions } from './types';

export const setQueryParam =
  (routerQuery: RouterQuery, type: RouterQueryOptions) =>
  (event: ChangeEvent) => {
    const { value } = event.target;

    routerQuery.setQueryOption(type, value);

    if (!value) {
      routerQuery.removeQuery(type);
    }
  };
