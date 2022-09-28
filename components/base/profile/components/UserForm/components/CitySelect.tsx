import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';

import { CityRequestData } from 'api/models/user';
import { selectRegions } from 'store/reducers/regions/selectors';

import { ProfileFields } from '../constants';
import { getCityOption, getCityOptions, getCityTitle } from '../helpers';
import { CitySelectProps } from '../types';

import styles from '../userForm.module.scss';

const CitySelect: FC<CitySelectProps> = ({
  getValues,
  onChangeForm,
  setValue,
}) => {
  const { data: regions } = useSelector(selectRegions);

  const defaultCityValue = getValues(ProfileFields.CITY) || '';
  const defaultCity = defaultCityValue instanceof Date ? '' : defaultCityValue;

  const cityOptions = getCityOptions(regions);
  const cityTitle = getCityTitle(defaultCity);

  const [selectValue, setSelectValue] = useState<CityRequestData | null>(null);
  const [inputValue, setInputValue] = useState<string>(cityTitle);

  useEffect(() => {
    const cityOption = getCityOption(defaultCity, cityOptions);
    setSelectValue(cityOption);
  }, [defaultCity, cityOptions]);

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
