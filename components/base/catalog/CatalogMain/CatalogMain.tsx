import React, { FC, useEffect, useState } from 'react';
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
import { checkScrollUp } from 'hooks/useScrollDirection/helpers';
import { useScrollDirection } from 'hooks/useScrollDirection';
import { checkMobileView } from 'utility/helpers/checkViewType';
import { getSlugsFromUrl } from 'utility/helpers';
import { QueryUrl } from 'constants/variables';

import { CustomButton } from 'components/ui/CustomButton';
import { Loader } from 'components/ui/Loader';
import { Sorting, FilterRequest } from 'types';

import { CatalogFilter } from '../CatalogFilter';
import { CatalogFilterDrawer } from '../CatalogFilterDrawer';
import { CatalogGrid } from '../CatalogGrid';
import { CatalogPagination } from '../CatalogPagination';
import { CatalogSort } from '../CatalogSort';

import { PAGE_QUERY } from '../constants';
import { isNotEnoughtItems, makeStringify } from '../helpers';

import styles from './catalogMain.module.scss';

const cn = classnames.bind(styles);

const CatalogMain: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { windowWidth } = useWindowSize();
  const scrollDirection = useScrollDirection();
  const { getQueryOption } = useRouterQuery();

  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sorting, setSorting] = useState<Sorting | null>(null);

  const { slug } = router.query;

  const isMobileView = checkMobileView(windowWidth);
  const isScrollUp = checkScrollUp(scrollDirection);

  const transportQuery = getQueryOption(QueryUrl.TRANSPORT_QUERY);

  const [filterRequest, setFilterRequest] = useState<FilterRequest | null>(
    null,
  );

  const currentSelector = transportQuery
    ? selectSearchProductList
    : selectCategoriesProductList;

  const { isLoading, data } = useSelector(currentSelector);
  const { pages, results, total } = data;
  const pageCount = Number(pages);

  useEffect(() => {
    if (!router.isReady) {
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

  useEffect(() => {
    if (!slug || !sorting || !filterRequest || !router.isReady) {
      return;
    }

    const stringifySlug = makeStringify(slug);

    const fetchTransportList = () => {
      if (typeof transportQuery === 'string' || !transportQuery) {
        return;
      }

      const transportSlugs = getSlugsFromUrl(transportQuery);

      const { brandSlug, modelSlug, yearSlug, engineSlug } = transportSlugs;

      dispatch(
        fetchTransportProductList({
          brandSlug,
          modelSlug,
          yearSlug,
          engineSlug,
          page,
          categorySlug: stringifySlug,
          filter: filterRequest,
          ...sorting,
        }),
      );
    };

    transportQuery
      ? fetchTransportList()
      : dispatch(
          fetchCategoriesProductsList({
            page,
            categorySlug: stringifySlug,
            filter: filterRequest,
            ...sorting,
          }),
        );
  }, [
    router.isReady,
    slug,
    dispatch,
    page,
    sorting,
    filterRequest,
    transportQuery,
  ]);

  const handleDrawerToggle = () => {
    setOpenDrawer((openDrawer) => !openDrawer);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box className={styles.catalogMainBox}>
        {!isMobileView && (
          <Box className={styles.catalogFilter_desktop}>
            <CatalogFilter setFilterRequest={setFilterRequest} />
          </Box>
        )}

        <Box className={styles.catalogMainContent}>
          <Box
            component='section'
            className={cn(styles.cardHeader, styles.cardHeaderContainer, {
              [styles.cardHeaderMobile]: isMobileView,
              [styles.cardHeaderMobile_show]: isMobileView && isScrollUp,
              [styles.cardHeaderMobile_hide]: isMobileView && !isScrollUp,
            })}
          >
            {isMobileView && (
              <>
                <CustomButton onClick={handleDrawerToggle}>
                  Фильтры
                </CustomButton>
              </>
            )}
            <CatalogSort setSorting={setSorting} />

            {!isMobileView && (
              <CatalogPagination
                pageCount={pageCount}
                currentPage={page}
                setPage={setPage}
              />
            )}
          </Box>

          {isLoading ? <Loader /> : <CatalogGrid items={results} />}
        </Box>
      </Box>

      {isMobileView && results.length && (
        <Box className={cn(styles.cardHeaderContainer, styles.pages)}>
          <CatalogPagination
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
      />
    </Box>
  );
};

export { CatalogMain };
