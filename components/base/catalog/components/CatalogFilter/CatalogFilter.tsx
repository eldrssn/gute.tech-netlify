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
import {
  getLinkToCatalog,
  getLinkToTransportCatalog,
} from 'utility/helpers/linkmakers';

import { CatalogFilterButton } from '../CatalogFilterButton';

import { componentByType } from './constants';
import { CatalogFilterProps } from './types';

import styles from './catalogFilter.module.scss';

const CatalogFilter: FC<CatalogFilterProps> = ({
  setFilterRequest,
  anchorApplyButton,
  setAnchorApplyButton,
  handleDrawerToggle,
}) => {
  const router = useRouter();

  const { categorySlug, subcategorySlug } = router.query;

  const transportId = useSelector(selectTransportId);

  const currentSelector = transportId
    ? selectTransportFilterList
    : selectCategoriesFilterList;

  const { isLoading, data: filters } = useSelector(currentSelector);

  const linkToTransportCatalog = getLinkToTransportCatalog({
    categorySlug,
    subcategorySlug,
    transportId,
  });

  const linkToCatalog = getLinkToCatalog({ categorySlug, subcategorySlug });

  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorApplyButton(event.currentTarget);
  };

  const handleResetClick = () => {
    setAnchorApplyButton(null);
    handleDrawerToggle && handleDrawerToggle();
    router.push(transportId ? linkToTransportCatalog : linkToCatalog);
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
            setFilterRequest={setFilterRequest}
            handleAnchorClick={handleAnchorClick}
          />
        );
      })}

      <Box
        sx={{ marginBottom: { xs: '40px', md: 0 } }}
        className={styles.resetButton}
        onClick={handleResetClick}
      >
        Cбросить фильтры
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
