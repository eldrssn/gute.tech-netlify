import { ParsedUrlQueryInput } from 'querystring';

import { FiltersCategoryResponseData, FilterTypes } from 'api/models/catalog';
import { FiltersRequest } from 'types';

import { ITEMS_PER_PAGE } from './constants';

const isNotEnoughtItems = (total?: string) => Number(total) <= ITEMS_PER_PAGE;

const getTypeList = (
  type: FilterTypes,
  filters: FiltersCategoryResponseData[],
) =>
  filters
    .filter((filter) => {
      if (filter.type === type) {
        return filter.slug;
      }
    })
    .map((filter) => filter.slug);

const setEmptyFilters = (filtersRequest: FiltersRequest | null) => {
  if (!filtersRequest) {
    return {};
  }

  const filters = { ...filtersRequest };

  for (const filter in filters) {
    if (filters[filter].length > 0) {
      filters[filter].length = 0;
    }
  }

  return filters;
};

const makeFiltersQueryObject = ({
  filtersRequest,
  filters,
}: {
  filtersRequest: FiltersRequest;
  filters: FiltersCategoryResponseData[];
}) => {
  const filtersRequestAnArray = Object.entries(filtersRequest);

  const rangerSlugs = getTypeList(FilterTypes.RANGE, filters);

  const sortedFilters: ParsedUrlQueryInput = filtersRequestAnArray.reduce(
    (accumulator, [title, values]) => {
      if (rangerSlugs.includes(title)) {
        const [minValue, maxValue] = values;

        return values.length === 0
          ? {
              ...accumulator,
              [`min${title}`]: [],
              [`max${title}`]: [],
            }
          : {
              ...accumulator,
              [`min${title}`]: minValue,
              [`max${title}`]: maxValue,
            };
      }

      return { ...accumulator, [title]: values };
    },
    {},
  );
  return sortedFilters;
};

export {
  isNotEnoughtItems,
  getTypeList,
  setEmptyFilters,
  makeFiltersQueryObject,
};
