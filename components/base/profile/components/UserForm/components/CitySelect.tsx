import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';

import { selectRegions } from 'store/reducers/regions/selectors';

import styles from '../userForm.module.scss';
import { CitySelectProps } from '../types';
import { ProfileFields } from '../constants';
import { CityRequestData } from 'api/models/user';
import { getCityOption, getCityOptions, getCityTitle } from '../helpers';

const CitySelect: FC<CitySelectProps> = ({
  getValues,
  onChangeForm,
  setValue,
}) => {
  const { data: regions } = useSelector(selectRegions);

  const defaultCity = getValues(ProfileFields.CITY) || '';

  const cityOptions = getCityOptions(regions);
  const cityOption = getCityOption(defaultCity);
  const cityTitle = getCityTitle(defaultCity);

  const [selectValue, setSelectValue] = useState<CityRequestData | null>(
    cityOption,
  );
  const [inputValue, setInputValue] = useState<string>(cityTitle);

  const handleSelectChange = (
    event: unknown,
    newValue: CityRequestData | null,
  ) => {
    if (!newValue) {
      return;
    }

    onChangeForm();
    setSelectValue(newValue);

    const { slug } = newValue;
    setValue(ProfileFields.CITY, slug, { shouldDirty: true });
  };

  const handleInputChange = (event: unknown, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  return (
    <Autocomplete
      className={styles.inputField}
      disablePortal
      value={selectValue}
      onChange={handleSelectChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={cityOptions}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => <TextField {...params} label='Выберите город' />}
      noOptionsText='Нет результатов'
    />
  );
};

export { CitySelect };
