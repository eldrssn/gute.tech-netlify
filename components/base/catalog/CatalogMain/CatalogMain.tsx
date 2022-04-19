import React, { FC, useEffect, useReducer, useState } from 'react';
import _debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import Box from '@mui/material/Box';

import { list } from 'mock/CatalogCardList';
import { useWindowSize } from 'hooks/useWindowSize';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { checkMobileView } from 'utility/helpers/checkViewType';

import { CustomButton } from 'components/ui/CustomButton';

import { CatalogList } from '../CatalogList';
import { CatalogSort } from '../CatalogSort';
import { CatalogFilter } from '../CatalogFilter';
import { CatalogPagination } from '../CatalogPagination';
import { CatalogFilterDrawer } from '../CatalogFilterDrawer';

import { getItemsInRow, scrollToPage } from './helpers';
import {
  PAGE_MARGIN,
  pagesPerPageCount,
  ROW_HIGHT,
  SCROLL_DIRECTIONS,
  PAGE_QUERY,
  DELAY,
} from '../constants';

import { catalogReducer } from './reducer';
import { initialState } from './reducer/constants';
import {
  changePage,
  getPageQuery,
  getScrollDirection,
  scroll,
} from './reducer/actions';

import styles from './catalogMain.module.scss';

const cn = classnames.bind(styles);

export const CatalogMain: FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [catalogState, catalogDispatch] = useReducer(
    catalogReducer,
    initialState,
  );

  const router = useRouter();
  const { setQueryOption, getQueryOption } = useRouterQuery();
  const { windowWidth } = useWindowSize();

  const handleDrawerToggle = () => {
    setOpenDrawer((openDrawer) => !openDrawer);
  };

  const setPageQuery = (page: number | string) => {
    const stringifiedPage = typeof page === 'number' ? page.toString() : page;
    setQueryOption.call(null, PAGE_QUERY, stringifiedPage);
  };

  const itemsInRow = getItemsInRow(windowWidth);

  const isMobileView = checkMobileView(windowWidth);

  const perPage = pagesPerPageCount[itemsInRow];

  const { page, scrollDirection, offset } = catalogState;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const page = Number(getQueryOption(PAGE_QUERY));

    if (page) {
      const scrollToRowIndex = (page - 1) * perPage;
      catalogDispatch(getPageQuery(scrollToRowIndex, page));
      scrollToPage(scrollToRowIndex, false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const handleRowsScroll = ({ stopIndex }: { stopIndex: number }) => {
    const page = Math.ceil(stopIndex / perPage);

    setPageQuery(page);
    catalogDispatch(scroll(page));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    const scrollToRowIndex = (page - 1) * perPage;

    scrollToPage(scrollToRowIndex);
    catalogDispatch(changePage(scrollToRowIndex));
  };

  const rowCount = Math.ceil(list.length / itemsInRow);
  const pageCount = Math.ceil(list.length / (itemsInRow * perPage));

  const isScrollUp = scrollDirection === SCROLL_DIRECTIONS.UP;
  const isTopPage = !!offset && offset < PAGE_MARGIN;
  const isBottomPage =
    !!offset && offset > perPage * (pageCount - 1) * ROW_HIGHT + PAGE_MARGIN;

  const onScroll = ({ scrollTop }: { scrollTop: number }) =>
    catalogDispatch(getScrollDirection(scrollTop));

  const onScrollDebounced = _debounce(onScroll, DELAY);

  return (
    <>
      <Box className={styles.catalogMainBox}>
        {!isMobileView && (
          <Box className={styles.catalogFilter_desktop}>
            <CatalogFilter />
          </Box>
        )}

        <Box
          className={styles.catalogMainContent}
          sx={{
            paddingLeft: {
              xs: 0,
              md: '30px',
            },
          }}
        >
          <Box
            component='section'
            className={cn(styles.cardHeader, styles.cardHeaderContainer, {
              [styles.cardHeaderMobile]: isMobileView,
              [styles.cardHeaderMobile_show]: isMobileView && isScrollUp,
              [styles.cardHeaderMobile_hide]: isMobileView && !isScrollUp,
              [styles.cardHeaderMobile_top]: isMobileView && isTopPage,
            })}
          >
            {isMobileView && (
              <CustomButton onClick={handleDrawerToggle}>Фильтры</CustomButton>
            )}
            <CatalogSort />

            {!isMobileView && (
              <CatalogPagination
                pageCount={pageCount}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            )}
          </Box>

          <CatalogList
            onScroll={onScrollDebounced}
            itemsInRow={itemsInRow}
            rowCount={rowCount}
            onRowsRendered={handleRowsScroll}
          />
        </Box>
      </Box>
      {isMobileView && (
        <Box
          className={cn(styles.cardHeaderContainer, styles.pages, {
            [styles.pages_show]: isScrollUp,
            [styles.pages_hide]: !isScrollUp,
            [styles.pages_bottom]: isBottomPage,
          })}
        >
          <CatalogPagination
            pageCount={pageCount}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </Box>
      )}

      <CatalogFilterDrawer
        openDrawer={openDrawer}
        handleDrawerToggle={handleDrawerToggle}
      />
    </>
  );
};
