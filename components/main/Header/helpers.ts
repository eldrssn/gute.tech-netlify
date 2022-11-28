import { UseFormSetValue } from 'react-hook-form';

import { FilterInputName, FormData } from 'components/main/Header/types';

const getYearsInfo = (years: number[]) =>
  years.length > 1 ? `${years[0]} - ${years[years.length - 1]}` : `${years[0]}`;

const setDefaultValueByName = (
  nameArray: FilterInputName[],
  setValue: UseFormSetValue<FormData>,
) => {
  nameArray.forEach((name) => {
    setValue(name, {
      title: '',
      slug: '',
      searchValue: null,
    });
  });
};

export { getYearsInfo, setDefaultValueByName };
