import { UseFormSetValue } from 'react-hook-form';

import {
  FilterInputName,
  FormData,
  WatchFormData,
} from 'components/main/Header/types';
import { BranchesData } from 'api/models/regions';

const getYearsInfo = (years: number[]) =>
  years.length > 1 ? `${years[0]} - ${years[years.length - 1]}` : `${years[0]}`;

const getCityTitle = (branches: BranchesData[], selectedCitySlug: string) =>
  branches.find((branch) => branch.slug === selectedCitySlug)?.title;

const setDefaultValueByName = (
  nameArray: FilterInputName[],
  setValue: UseFormSetValue<FormData>,
  valueForm: WatchFormData | undefined,
) => {
  nameArray.forEach((name) => {
    const searchValue = valueForm ? valueForm[name]?.searchValue : '';
    setValue(name, {
      title: '',
      slug: '',
      searchValue: searchValue ? searchValue : null,
    });
  });
};

export { getYearsInfo, getCityTitle, setDefaultValueByName };
