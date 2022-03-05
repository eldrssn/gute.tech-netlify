import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';

import { RouterQuery } from './types';

const useRouterQuery = () => {
  const router = useRouter();
  const { query, pathname } = router;

  const updateQuery = (newQuery: string | ParsedUrlQueryInput) =>
    router.push({ pathname, query: newQuery });

  const getQueryOption = useCallback(
    (name: string) => router.query[name],
    [router],
  );

  /**
   * Param option required only for array queries. Function will try to delete from an array in query option. Either way it will delete whole query.
   */
  const removeQuery = useCallback(
    (name: string, param?: string) => {
      const queryOption = query[name];

      if (Array.isArray(queryOption) && param) {
        const newQuery = {
          ...query,
          [name]: queryOption.filter((option) => option !== param),
        };

        updateQuery(newQuery);

        return;
      }

      const newQuery = Object.keys(query).reduce<ParsedUrlQuery>(
        (queryObj, key) => {
          if (key === name) {
            return queryObj;
          }

          return { ...queryObj, [key]: query[key] };
        },
        {},
      );

      updateQuery(newQuery);
    },
    [router],
  );

  const setQueryOption = useCallback(
    (name: string, param: string) => {
      const newQuery = {
        ...query,
        [name]: param,
      };

      updateQuery(newQuery);
    },
    [router],
  );

  /**
   * Function will try to push or create array of queries, if same key already exists in query. Either way it will create new query parameter
   */
  const updateQueryOption = useCallback(
    (name: string, param: string) => {
      const queryOption = query[name];

      if (Array.isArray(queryOption)) {
        const newQueryArray = [...queryOption, param];
        const newQuery = { ...query, [name]: newQueryArray };

        updateQuery(newQuery);

        return;
      }

      const newQuery = {
        ...query,
        [name]: queryOption ? [queryOption, param] : param,
      };

      updateQuery(newQuery);
    },
    [router],
  );

  const routerQuery: RouterQuery = {
    setQueryOption,
    removeQuery,
    getQueryOption,
    updateQueryOption,
  };

  return routerQuery;
};

export default useRouterQuery;
