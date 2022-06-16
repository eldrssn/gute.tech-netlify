import { CheckboxValue } from 'api/models/catalog';
import { NextRouter } from 'next/router';
import { MIN_FILTERS_COUNT } from './constants';
import { GetQueryOptions } from './types';

const checkIsAllFiltersChoosen = (
  slug: string,
  getQueryOption: GetQueryOptions,
  filters?: CheckboxValue[],
) => {
  const queryOptions = getQueryOption(slug);

  if (!queryOptions || !filters) {
    return;
  }

  return (
    Array.isArray(getQueryOption(slug)) && queryOptions.length >= filters.length
  );
};

const checkFilterListLarge = (values?: CheckboxValue[]) =>
  values && values.length > MIN_FILTERS_COUNT;

const sliceFilters = (values?: CheckboxValue[]) =>
  values?.slice(0, MIN_FILTERS_COUNT);

const chooseAllFilters = (
  router: NextRouter,
  slug: string,
  filters?: CheckboxValue[],
) => {
  if (!filters) {
    return;
  }

  const slugs: string[] = filters.reduce(
    (accumulator: string[], filter: CheckboxValue) => {
      return [...accumulator, filter.value];
    },
    [],
  );

  const checkboxQuery = slugs.reduce((accumulator, query) => {
    return `${accumulator}&${slug}=${query}`;
  }, '');

  const { asPath } = router;
  const href = `${asPath}${checkboxQuery}`;
  router.push(href, undefined, { scroll: false });
};

const filterFilters = (searchValue: string, filters?: CheckboxValue[]) =>
  filters?.filter((filter) => {
    const title = filter.title.toLowerCase();
    return title.includes(searchValue.toLowerCase());
  });

export {
  checkIsAllFiltersChoosen,
  checkFilterListLarge,
  sliceFilters,
  chooseAllFilters,
  filterFilters,
};
