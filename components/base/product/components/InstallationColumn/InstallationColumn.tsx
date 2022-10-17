/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Loader } from 'components/ui/Loader';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import cn from 'classnames';

import {
  selectProductBrandsList,
  selectProductModelsList,
  selectProductYearsList,
  selectProductTransportsList,
} from 'store/reducers/catalog/selectors';
import {
  fetchProductModelsList,
  fetchProductYearsList,
  fetchProductTransportsList,
  clearProductInstallationError,
} from 'store/reducers/catalog/actions';
import { makeAnArray } from 'utility/helpers';

import { getDisplayedInformation } from './helpers';
import { optionColumn, InstallationColumnNames } from '../../types';
import { getProductSlug } from '../../helpers';
import { Props } from './types';
import styles from './styles.module.scss';

const InstallationColumn: FC<Props> = ({ column, getValues, setValue }) => {
  const [currentOption, setCurrentOption] = useState<string>();

  const dispatch = useDispatch();
  const router = useRouter();

  const categorySlugArray = makeAnArray(router.query.categorySlug);
  const lastCategorySlug = categorySlugArray.slice(-1)[0];

  const productSlug = getProductSlug(lastCategorySlug);
  const brandSlug = getValues(InstallationColumnNames.brandSlug);
  const modelSlug = getValues(InstallationColumnNames.modelSlug);

  const getDataByOption = {
    [optionColumn.BRAND]: (brandSlug: string) =>
      dispatch(fetchProductModelsList({ productSlug, brandSlug })),
    [optionColumn.MODEL]: (modelSlug: string) =>
      dispatch(fetchProductYearsList({ productSlug, brandSlug, modelSlug })),
    [optionColumn.YEAR]: (yearSlug: string) =>
      dispatch(
        fetchProductTransportsList({
          productSlug,
          brandSlug,
          modelSlug,
          yearSlug,
        }),
      ),
    [optionColumn.TRANSPORT]: (slug: string) => null,
  };

  const dataByOption = {
    [optionColumn.BRAND]: useSelector(selectProductBrandsList),
    [optionColumn.MODEL]: useSelector(selectProductModelsList),
    [optionColumn.YEAR]: useSelector(selectProductYearsList),
    [optionColumn.TRANSPORT]: useSelector(selectProductTransportsList),
  };

  const onClick = (slug: string) => {
    getDataByOption[column.optionColumn](slug);
    setValue(column.name, slug);
    setCurrentOption(slug);
    dispatch(clearProductInstallationError());
  };

  const { data, error, isLoading } = dataByOption[column.optionColumn];
  const displayedInformation = getDisplayedInformation(
    data,
    column.optionColumn,
    error,
  );
  const isCorrectInfo = Array.isArray(displayedInformation);
  const isYearColumn = column.name === InstallationColumnNames.yearSlug;
  const isTransportColumn =
    column.name === InstallationColumnNames.transportSlug;
  const isError = Boolean(error);

  useEffect(() => {
    setCurrentOption('');
  }, [data]);

  return (
    <Box className={styles.column}>
      <Box className={styles.placeholder}>
        <Typography>{column.placeholder}</Typography>
      </Box>
      <Box className={styles.topShadowBox} />
      <Box
        className={cn(styles.bottomShadowBox, {
          [styles.lastBottomShadowBox]: isTransportColumn,
        })}
      />
      <Box
        key={column.name}
        className={cn(styles.box, {
          [styles.rightSideBorderBox]: !isTransportColumn,
        })}
      >
        {isCorrectInfo ? (
          displayedInformation.map((item) => {
            const isActiveOption =
              isYearColumn && item.years_string
                ? item.years_string === currentOption
                : item.slug === currentOption;

            return (
              <>
                {isTransportColumn ? (
                  <Box key={item.id} className={styles.listItem}>
                    <Typography>{item.brand.title}</Typography>
                    <Typography>{item.model.title}</Typography>
                    <Typography>{item.engine.title}</Typography>
                  </Box>
                ) : (
                  <Box
                    key={item.id}
                    className={cn(styles.listItem, styles.point, {
                      [styles.activeOption]: isActiveOption,
                    })}
                    onClick={() =>
                      onClick(
                        isYearColumn && item.years_string
                          ? item.years_string
                          : item.slug,
                      )
                    }
                  >
                    {isYearColumn && item.years_string
                      ? item.years_string
                      : item.title}
                  </Box>
                )}
              </>
            );
          })
        ) : (
          <Box className={styles.listItem}>
            {isLoading ? (
              <Loader />
            ) : (
              <Typography
                className={cn(styles.attention, { [styles.error]: isError })}
              >
                {displayedInformation}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export { InstallationColumn };
