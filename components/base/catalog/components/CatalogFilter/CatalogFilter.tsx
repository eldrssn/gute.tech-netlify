import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

import { selectTransportId } from 'store/reducers/transport/selectors';
import {
  selectCategoriesFilterList,
  selectTransportFilterList,
} from 'store/reducers/catalog/selectors';
import { Loader } from 'components/ui/Loader';
import { getLinkResetFilters } from 'utility/helpers/linkmakers';

import { CatalogFilterButton } from '../CatalogFilterButton';

import { componentByType } from './constants';
import { CatalogFilterProps } from './types';

import styles from './catalogFilter.module.scss';
import { CustomButton } from 'components/ui/CustomButton';

const CatalogFilter: FC<CatalogFilterProps> = ({
  filterRequest,
  setFilterRequest,
  anchorApplyButton,
  setAnchorApplyButton,
  handleDrawerToggle,
}) => {
  const router = useRouter();

  const { asPath } = router;

  const transportId = useSelector(selectTransportId);

  const currentSelector = transportId
    ? selectTransportFilterList
    : selectCategoriesFilterList;

  const { isLoading, data: filters } = useSelector(currentSelector);

  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorApplyButton(event.currentTarget);
  };

  const handleRemoveAnchorClick = () => {
    setAnchorApplyButton(null);
    handleDrawerToggle && handleDrawerToggle();
  };

  const handleResetClick = () => {
    handleRemoveAnchorClick();
    router.push(
      getLinkResetFilters({
        asPath,
        transportId,
      }),
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {filters.map((filter) => {
        const Component = componentByType[filter.type];

        return (
          <Component
            key={filter.slug}
            filter={filter}
            filterRequest={filterRequest}
            setFilterRequest={setFilterRequest}
            handleAnchorClick={handleAnchorClick}
          />
        );
      })}

      <Box className={styles.buttonBox}>
        <CustomButton
          onClick={handleRemoveAnchorClick}
          customStyles={styles.applyButton}
        >
          Применить
        </CustomButton>
        <CustomButton
          customStyles={styles.resetButton}
          onClick={handleResetClick}
        >
          Cбросить фильтры
        </CustomButton>
      </Box>

      <CatalogFilterButton
        anchorApplyButton={anchorApplyButton}
        setAnchorApplyButton={setAnchorApplyButton}
        handleDrawerToggle={handleDrawerToggle}
      />
    </>
  );
};

export { CatalogFilter };
