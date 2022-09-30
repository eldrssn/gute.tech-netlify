import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Controller } from 'react-hook-form';

import {
  selectBranches,
  selectSelectedCitySlug,
} from 'store/reducers/regions/selectors';
import { BranchesData, BranchOfficeData } from 'api/models/regions';
import { getInputRules } from 'utility/helpers';

import { getBranchOffice } from '../../helpers';
import { TDeliveryAddressProps } from '../../types';
import styles from './DeliveryAddress.module.scss';

const DeliveryAddress: React.FC<TDeliveryAddressProps> = ({
  control,
  setValue,
}) => {
  const [selectCitySlug, setSelectCitySlug] = useState<string | undefined>();

  const { data: branchesCity } = useSelector(selectBranches);
  const selectedCitySlug = useSelector(selectSelectedCitySlug);

  const branchOffices = getBranchOffice(branchesCity, selectCitySlug);

  useEffect(() => {
    if (selectedCitySlug.length === 0) {
      return;
    }

    setSelectCitySlug(selectedCitySlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant='h6' className={styles.formHeading}>
        Доставка
      </Typography>
      <Box className={styles.inputContainer}>
        <Controller
          render={({ field, fieldState }) => {
            setSelectCitySlug(field.value?.slug);

            return (
              <Autocomplete
                {...field}
                options={branchesCity}
                noOptionsText='Нет совпадений'
                getOptionLabel={(option: BranchesData) => option.title}
                onChange={(_, data) => {
                  field.onChange(data);
                  setValue('branch', null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={styles.input}
                    label='Выберите город'
                    variant='outlined'
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            );
          }}
          name='branchesData'
          control={control}
          rules={getInputRules()}
        />
      </Box>
      <Box className={styles.inputContainer}>
        <Controller
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              disabled={branchOffices.length === 0}
              options={branchOffices}
              noOptionsText='Нет совпадений'
              getOptionLabel={(option: BranchOfficeData) => option.street}
              onChange={(_, data) => field.onChange(data)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className={styles.input}
                  label='Выберите филиал'
                  variant='outlined'
                  error={Boolean(fieldState.error) && branchOffices.length > 0}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          )}
          name='branch'
          control={control}
          rules={getInputRules()}
        />
      </Box>
    </>
  );
};

export { DeliveryAddress };
