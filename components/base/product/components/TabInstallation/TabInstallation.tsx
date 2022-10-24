/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';

import {
  fetchProductBrandsList,
  clearProductInstallationError,
} from 'store/reducers/product/actions';
import { TabProps } from 'types/product';
import { makeAnArray } from 'utility/helpers';

import { InstallationColumn } from '../InstallationColumn';
import { getProductSlug } from '../../helpers';
import { installationColumns } from '../../constants';
import { FormData } from './types';
import styles from './styles.module.scss';

const TabInstallation: FC<TabProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { getValues, setValue } = useForm<FormData>();

  const categorySlugArray = makeAnArray(router.query.categorySlug);
  const lastCategorySlug = categorySlugArray.slice(-1)[0];
  const productSlug = getProductSlug(lastCategorySlug);

  useEffect(() => {
    dispatch(fetchProductBrandsList({ productSlug }));
    dispatch(clearProductInstallationError());
  }, []);

  return (
    <Box className={styles.mainBox}>
      {installationColumns.map((column) => (
        <InstallationColumn
          key={column.name}
          column={column}
          getValues={getValues}
          setValue={setValue}
        />
      ))}
    </Box>
  );
};

export { TabInstallation };
