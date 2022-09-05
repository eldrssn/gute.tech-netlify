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
  selectCategoriesProductList,
  selectSearchProductList,
} from 'store/reducers/catalog/selectors';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { useWindowSize } from 'hooks/useWindowSize';
import { makeAnArray, scrollToTop } from 'utility/helpers';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { CustomButton } from 'components/ui/CustomButton';
import { Loader } from 'components/ui/Loader';
import { PaginationNav } from 'components/ui/PaginationNav';
import { SubcategoriesList } from 'components/main/SubcategoriesList';
import { Sorting, FilterRequest } from 'types';

import { CatalogFilter } from '../CatalogFilter';
import { CatalogFilterDrawer } from '../CatalogFilterDrawer';
import { CatalogGrid } from '../CatalogGrid';
import { CatalogSort } from '../CatalogSort';
import { PAGE_QUERY } from '../../constants';
import { isNotEnoughtItems } from '../../helpers';
import styles from './catalogMain.module.scss';

const cn = classnames.bind(styles);

const CatalogMain: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();
  const { getQueryOption } = useRouterQuery();

  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sorting, setSorting] = useState<Sorting | null>(null);
  const [filterRequest, setFilterRequest] = useState<FilterRequest | null>(
    null,
  );
  const [anchorApplyButton, setAnchorApplyButton] =
    useState<HTMLElement | null>(null);

  const { categorySlug } = router.query;
  const categorySlugAnArray = makeAnArray(categorySlug);
  const lastCategorySlug = categorySlugAnArray[categorySlugAnArray.length - 1];

  const transportId = useSelector(selectTransportId);

  const currentSelector = transportId
    ? selectSearchProductList
    : selectCategoriesProductList;

  const { data, isLoading } = useSelector(currentSelector);
  const { pages, results, total } = data || {};
  const pageCount = Number(pages);

  useEffect(() => {
    if (!router.isReady || !total) {
      return;
    }
    const pageFromQuery = Number(getQueryOption(PAGE_QUERY));

    if (pageFromQuery) {
      setPage(pageFromQuery);
    }

    if (isNotEnoughtItems(total)) {
      setPage(1);
    }
  }, [router.isReady, getQueryOption, total]);

  const fetchTransportList = useCallback(() => {
    if (Array.isArray(transportId) || !transportId || !filterRequest) {
      return;
    }

    dispatch(
      fetchTransportProductList({
        transportId,
        page,
        categorySlug: lastCategorySlug,
        filter: filterRequest,
        ...sorting,
      }),
    );
  }, [transportId, filterRequest, dispatch, page, sorting, lastCategorySlug]);

  useEffect(() => {
    if (!lastCategorySlug || !sorting || !router.isReady || !filterRequest) {
      return;
    }

    if (!anchorApplyButton) {
      transportId
        ? fetchTransportList()
        : dispatch(
            fetchCategoriesProductsList({
              page,
              categorySlug: lastCategorySlug,
              filter: filterRequest,
              ...sorting,
            }),
          );
      scrollToTop();
    }
  }, [
    anchorApplyButton,
    router.isReady,
    lastCategorySlug,
    dispatch,
    fetchTransportList,
    page,
    sorting,
    filterRequest,
    transportId,
  ]);

  const handleDrawerToggle = () => {
    setOpenDrawer((openDrawer) => !openDrawer);
    setAnchorApplyButton(null);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box className={styles.catalogMainBox}>
        {!isMobile && !!data && (
          <Box className={styles.sideMenu}>
            <SubcategoriesList isCatalog />
            <Box className={styles.catalogFilter_desktop}>
              <CatalogFilter
                setFilterRequest={setFilterRequest}
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

          {!isMobile && !!data && (
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
          {isMobile && <SubcategoriesList isCatalog />}

          {isLoading ? <Loader /> : <CatalogGrid items={results || []} />}
        </Box>
      </Box>

      {isMobile && data && (
        <Box className={cn(styles.cardHeaderContainer, styles.pages)}>
          <PaginationNav
            pageCount={pageCount}
            currentPage={page}
            setPage={setPage}
          />
        </Box>
      )}

      <CatalogFilterDrawer
        openDrawer={openDrawer}
        handleDrawerToggle={handleDrawerToggle}
        setFilterRequest={setFilterRequest}
        anchorApplyButton={anchorApplyButton}
        setAnchorApplyButton={setAnchorApplyButton}
        setSorting={setSorting}
      />
    </Box>
  );
};

export { CatalogMain };
