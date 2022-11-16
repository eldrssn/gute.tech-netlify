import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';

import {
  clearProductReviewsList,
  fetchProductReviewsList,
} from 'store/reducers/product/actions';
import { selectProductReviewsList } from 'store/reducers/product/selectors';
import { Loader } from 'components/ui/Loader';

import { AddReviewButton } from './components/AddReviewButton';
import { PaginationNav } from './components/PaginationNav';
import { ReviewsBox } from './components/ReviewsBox';
import { getProductSlugQuery } from '../../helpers';

import styles from './tabReviews.module.scss';

const TabReviews: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { isLoading, data: reviewsData } = useSelector(
    selectProductReviewsList,
  );
  const { pages, results: reviewsList } = reviewsData || {};

  const productSlug = getProductSlugQuery(router);

  useEffect(() => {
    return () => {
      dispatch(clearProductReviewsList());
      setPage(1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchProductReviewsList({ productSlug, page }));
  }, [page, dispatch, productSlug]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ReviewsBox reviewsList={reviewsList} />
          <Box className={styles.navBox}>
            <AddReviewButton />
            {pages && (
              <PaginationNav
                pageCount={Number(pages)}
                currentPage={page}
                setPage={setPage}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
};

export { TabReviews };
