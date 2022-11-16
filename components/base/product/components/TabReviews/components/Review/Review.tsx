import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import { ReviewProps } from '../../types';

import styles from './reviews.module.scss';

const Review: FC<ReviewProps> = ({ item }) => {
  const { first_name, last_name, created_at, grade, comment } = item;

  const lastNameLetter = last_name && `${last_name.slice(0, 1)}.`;
  const date = created_at && new Date(created_at).toLocaleDateString();

  return (
    <Box className={styles.mainBox}>
      <Box className={styles.userBox}>
        <Box className={styles.userInfo}>
          <p className={styles.userName}>{`${first_name} ${lastNameLetter}`}</p>
          <p className={styles.userDate}>{date}</p>
        </Box>
      </Box>

      <Box className={styles.reviewBox}>
        <Box className={styles.ratingBox}>
          <Box className={styles.ratingItem}>
            <p className={styles.ratingItem_title}>Оценка</p>
            <Rating name='product' defaultValue={grade} size='small' readOnly />
          </Box>
        </Box>

        <Box>
          <p className={styles.reviewText}>{comment}</p>
        </Box>
      </Box>
    </Box>
  );
};

export { Review };
