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

export const checkQueryValue = (queryValue?: string | string[]) => {
  return Array.isArray(queryValue) ? queryValue[0] : queryValue || '';
};

export const getQueryParams = (routerQuery: RouterQuery, query: string) => {
  const queryValue = routerQuery.getQueryOption(query);
  return checkQueryValue(queryValue);
};
