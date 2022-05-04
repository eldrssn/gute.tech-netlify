/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';

import { RouterQuery } from './types';

export const useRouterQuery = () => {
  const router = useRouter();
  const { query, pathname, isReady } = router;

  const updateQuery = useCallback(
    (newQuery: string | ParsedUrlQueryInput) => {
      if (!isReady) {
        return;
      }

      router.push({ pathname, query: newQuery });
    },
    [isReady],
  );

  const getQueryOption = useCallback((name: string) => query[name], [query]);

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
    [query, updateQuery],
  );

  const setQueryOption = useCallback(
    (name: string, param: string) => {
      const newQuery = {
        ...query,
        [name]: param,
      };

      updateQuery(newQuery);
    },
    [updateQuery, query],
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
    [query, updateQuery],
  );

  const routerQuery: RouterQuery = useMemo(() => {
    return {
      setQueryOption,
      removeQuery,
      getQueryOption,
      updateQueryOption,
    };
  }, [setQueryOption, removeQuery, getQueryOption, updateQueryOption]);

  return routerQuery;
};
