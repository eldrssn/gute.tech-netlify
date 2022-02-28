import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';

const useRouterQuery = () => {
  const router = useRouter();
  const { query, pathname } = router;

  const push = (newQuery: string | ParsedUrlQueryInput) =>
    router.push({ pathname, query: newQuery });

  const get = useCallback(
    (name: string) => {
      return router.query[name];
    },
    [router],
  );

  const remove = useCallback(
    (name: string, param?: string) => {
      const queryOption = query[name];

      if (Array.isArray(queryOption) && param) {
        const newQueryOption = {
          [name]: queryOption.filter((option) => option !== param),
        };

        const newQuery = Object.assign({}, query, newQueryOption);

        push(newQuery);
        return;
      }

      const newQuery = { ...query };
      delete newQuery[name];

      push(newQuery);
    },
    [router],
  );

  const set = useCallback(
    (name: string, param: string) => {
      const newQuery = {
        ...query,
        [name]: param,
      };
      push(newQuery);
    },
    [router],
  );

  const create = useCallback(
    (name: string, param: string) => {
      const queryOption = query[name];

      if (Array.isArray(queryOption)) {
        const newQueryArray = queryOption;
        newQueryArray.push(param);

        const newQueryOption = {
          ...query,
          [name]: newQueryArray,
        };

        const newQuery = Object.assign({}, query, newQueryOption);
        push(newQuery);
        return;
      }

      const newQueryOption = {
        [name]: queryOption ? [queryOption, param] : param,
      };

      const newQuery = Object.assign({}, query, newQueryOption);
      push(newQuery);
    },
    [router],
  );

  return {
    set,
    remove,
    get,
    create,
  };
};

export default useRouterQuery;
