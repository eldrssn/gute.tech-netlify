import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import Box from '@mui/material/Box';

import {
  fetchCategoriesProductsList,
  fetchTransportProductList,
} from 'store/reducers/catalog/actions';
import {
  selectCategoriesFilterList,
  selectCategoriesProductList,
  selectSearchProductList,
  selectTransportFilterList,
} from 'store/reducers/catalog/selectors';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { useWindowSize } from 'hooks/useWindowSize';
import { makeAnArray } from 'utility/helpers';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { CustomButton } from 'components/ui/CustomButton';
import { Loader } from 'components/ui/Loader';
import { PaginationNav } from 'components/ui/PaginationNav';
import { CatalogCategories } from 'components/main/CatalogCategories';
import { Sorting, filtersRequest } from 'types';

import { CatalogFilter } from '../CatalogFilter';
import { CatalogFilterDrawer } from '../CatalogFilterDrawer';
import { CatalogGrid } from '../CatalogGrid';
import { CatalogSort } from '../CatalogSort';
import { PAGE_QUERY } from '../../constants';
import { isNotEnoughtItems, makeFiltersQueryObject } from '../../helpers';

import styles from './catalogMain.module.scss';

const cn = classnames.bind(styles);

const CatalogMain: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();
  const { getQueryOption, setQueryOption } = useRouterQuery();

  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sorting, setSorting] = useState<Sorting | null>(null);
  const [filtersRequest, setFiltersRequest] = useState<filtersRequest | null>(
    null,
  );
  const [anchorApplyButton, setAnchorApplyButton] =
    useState<HTMLElement | null>(null);

  const { categorySlug } = router.query;
  const categorySlugAnArray = makeAnArray(categorySlug);
  const lastCategorySlug = categorySlugAnArray[categorySlugAnArray.length - 1];

  const transportId = useSelector(selectTransportId);

  const productListSelector = transportId
    ? selectSearchProductList
    : selectCategoriesProductList;

  const filtersSelector = transportId
    ? selectTransportFilterList
    : selectCategoriesFilterList;

  const { data: filters } = useSelector(filtersSelector);
  const { data, isLoading } = useSelector(productListSelector);

  const { pages, results, total } = data || {};
  const pageCount = Number(pages);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const pageFromQuery = Number(getQueryOption(PAGE_QUERY));

    if (pageFromQuery) {
      setPage(pageFromQuery);
      return;
    }

    if (isNotEnoughtItems(total)) {
      setPage(1);
    }
  }, [router.isReady, getQueryOption, total]);

  const fetchTransportList = useCallback(() => {
    if (Array.isArray(transportId) || !transportId || !filtersRequest) {
      return;
    }

    dispatch(
      fetchTransportProductList({
        transportId,
        page,
        categorySlug: lastCategorySlug,
        filter: filtersRequest,
        ...sorting,
      }),
    );
  }, [transportId, filtersRequest, dispatch, page, sorting, lastCategorySlug]);

  const getFiltersQueryObject = useCallback(
    () =>
      filtersRequest ? makeFiltersQueryObject({ filtersRequest, filters }) : {},
    [filtersRequest, filters],
  );

  useEffect(() => {
    if (!anchorApplyButton) {
      const queryParams = getFiltersQueryObject();
      setQueryOption({ ...queryParams, page: 1 }, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorApplyButton]);

  useEffect(() => {
    if (!lastCategorySlug || !sorting || !router.isReady || !filtersRequest) {
      return;
    }

    if (!anchorApplyButton) {
      transportId
        ? fetchTransportList()
        : dispatch(
            fetchCategoriesProductsList({
              page,
              categorySlug: lastCategorySlug,
              filter: filtersRequest,
              ...sorting,
            }),
          );
    }
  }, [
    anchorApplyButton,
    router.isReady,
    lastCategorySlug,
    dispatch,
    fetchTransportList,
    page,
    sorting,
    filtersRequest,
    transportId,
  ]);

  const handleDrawerToggle = () => {
    setOpenDrawer((openDrawer) => !openDrawer);
    setAnchorApplyButton(null);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box className={styles.catalogMainBox}>
        {!isMobile && (
          <Box className={styles.sideMenu}>
            <CatalogCategories />
            <Box className={styles.catalogFilter_desktop}>
              <CatalogFilter
                filtersRequest={filtersRequest}
                setFiltersRequest={setFiltersRequest}
                anchorApplyButton={anchorApplyButton}
                setAnchorApplyButton={setAnchorApplyButton}
              />
            </Box>
          </Box>
        )}
        <Box className={styles.catalogMainContent}>
          {isMobile && (
            <CustomButton
              onClick={handleDrawerToggle}
              customStyles={styles.filterButton_mobile}
            >
              Фильтры
            </CustomButton>
          )}

          {!isMobile && (
            <Box
              component='section'
              className={cn(styles.cardHeader, styles.cardHeaderContainer)}
            >
              <CatalogSort setSorting={setSorting} />

              <PaginationNav
                pageCount={pageCount}
                currentPage={page}
                setPage={setPage}
              />
            </Box>
          )}

          {isLoading ? <Loader /> : <CatalogGrid items={results || []} />}
        </Box>
      </Box>

      {isMobile && (
        <Box className={cn(styles.cardHeaderContainer, styles.pages)}>
          <PaginationNav
            pageCount={pageCount}
            currentPage={page}
            setPage={setPage}
          />
        </Box>
      )}

      {isMobile && (
        <CatalogFilterDrawer
          filtersRequest={filtersRequest}
          openDrawer={openDrawer}
          handleDrawerToggle={handleDrawerToggle}
          setFiltersRequest={setFiltersRequest}
          anchorApplyButton={anchorApplyButton}
          setAnchorApplyButton={setAnchorApplyButton}
          setSorting={setSorting}
        />
      )}
    </Box>
  );
};

export { CatalogMain };
