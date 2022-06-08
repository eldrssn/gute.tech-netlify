import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

import { QueryUrl } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';
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
  const { getQueryOption } = useRouterQuery();

  const { categorySlug, subcategorySlug } = router.query;

  const transportQuery = getQueryOption(QueryUrl.TRANSPORT_QUERY);
  const transportId = getQueryOption(QueryUrl.TRANSPORT_ID);

  const currentSelector = transportQuery
    ? selectTransportFilterList
    : selectCategoriesFilterList;

  const { isLoading, data: filters } = useSelector(currentSelector);

  const linkToTransportCatalog = getLinkToTransportCatalog({
    categorySlug,
    subcategorySlug,
    transportQuery,
    transportId,
  });

  const linkToCatalog = getLinkToCatalog({ categorySlug, subcategorySlug });

  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorApplyButton(event.currentTarget);
  };

  const handleResetClick = () => {
    setAnchorApplyButton(null);
    handleDrawerToggle && handleDrawerToggle();
    router.push(transportQuery ? linkToTransportCatalog : linkToCatalog);
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
