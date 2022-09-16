import { UseFormSetValue } from 'react-hook-form';
import {
  FilterInputName,
  FormData,
  WatchFormData,
} from 'components/main/Header/types';

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

export { setDefaultValueByName };
