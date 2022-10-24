import React, { FC } from 'react';
import Box from '@mui/material/Box';

import { CustomButton } from 'components/ui/CustomButton';

import { PaginationNav } from './components/PaginationNav';
import { Review } from './components/Review/Review';
import { mockReviews } from './mocks';

import styles from './tabReviews.module.scss';

const TabReviews: FC = () => (
  <>
    {mockReviews.map((review) => (
      <Review key={review.id} item={review} />
    ))}
    <Box className={styles.navBox}>
      <CustomButton>Добавит отзыв</CustomButton>
      <PaginationNav />
    </Box>
  </>
);

export { TabReviews };
