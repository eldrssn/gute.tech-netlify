import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Autocomplete, Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

import { fetchBranches } from 'store/reducers/regions/actions';
import { selectBranches } from 'store/reducers/regions/selectors';
import { BranchesData, BranchOfficeData } from 'api/models/regions';
import { getInputRules } from 'utility/helpers';

import { TDeliveryAddressProps } from '../../types';
import styles from './DeliveryAddress.module.scss';

const DeliveryAddress: React.FC<TDeliveryAddressProps> = ({
  control,
  setValue,
}) => {
  const dispatch = useDispatch();
  const [selectCitySlug, setSelectCitySlug] = useState<string | undefined>();

  const { data: branchesCity } = useSelector(selectBranches);

  const branches =
    branchesCity.find((branch) => branch.slug === selectCitySlug)?.branches ||
    [];

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

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
              disabled={Boolean(!branches.length)}
              options={branches}
              getOptionLabel={(option: BranchOfficeData) => option.street}
              onChange={(_, data) => field.onChange(data)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className={styles.input}
                  label='Выберите филиал'
                  variant='outlined'
                  error={Boolean(fieldState.error) && Boolean(branches.length)}
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
