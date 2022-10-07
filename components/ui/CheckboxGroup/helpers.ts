import { CheckboxValue } from 'api/models/catalog';
import { MIN_FILTERS_COUNT } from './constants';
import { ChooseAllFilters, GetQueryOptions } from './types';

const checkIsAllFiltersChoosen = (
  slug: string,
  getQueryOption: GetQueryOptions,
  filters?: CheckboxValue[],
) => {
  const queryOptions = getQueryOption(slug);

  if (!queryOptions || !filters) {
    return false;
  }

  return (
    Array.isArray(getQueryOption(slug)) && queryOptions.length >= filters.length
  );
};

const checkFilterListLarge = (values?: CheckboxValue[]) =>
  values && values.length > MIN_FILTERS_COUNT;

const sliceFilters = (values?: CheckboxValue[]) =>
  values?.slice(0, MIN_FILTERS_COUNT);

const chooseAllFilters = ({
  setFiltersRequest,
  slug,
  filters,
}: ChooseAllFilters) => {
  if (!filters) {
    return;
  }

  const reducedFilters =
    filters?.reduce(
      (accumulator: string[], filter) =>
        accumulator ? [...accumulator, filter.value] : [filter.value],
      [],
    ) || [];

  setFiltersRequest((filtersRequest) => ({
    ...filtersRequest,
    [slug]: reducedFilters,
  }));
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
