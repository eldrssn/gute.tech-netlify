import React, { FC } from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';

import { ReviewProps } from '../../types';

import styles from './reviews.module.scss';

const Review: FC<ReviewProps> = ({ item }) => {
  const { userName, date, userPhoto, rating, header, text } = item;

  return (
    <Box className={styles.mainBox}>
      <Box className={styles.userBox}>
        <CardMedia
          component={'img'}
          height='40'
          image={userPhoto}
          alt='Фото пользователя'
          className={styles.userImage}
        />
        <Box className={styles.userInfo}>
          <p className={styles.userName}>{userName}</p>
          <p className={styles.userDate}>{date}</p>
        </Box>
      </Box>

      <Box className={styles.reviewBox}>
        <Box className={styles.ratingBox}>
          <Box className={styles.ratingItem}>
            <p className={styles.ratingItem_title}>Товар</p>
            <Rating
              name='product'
              defaultValue={rating.product}
              size='small'
              readOnly
            />
          </Box>

          <Box className={styles.ratingItem}>
            <p className={styles.ratingItem_title}>Магазин</p>
            <Rating
              name='shop'
              defaultValue={rating.shop}
              size='small'
              readOnly
            />
          </Box>
        </Box>

        <Box>
          <h5 className={styles.reviewHeader}>{header}</h5>
          <p className={styles.reviewText}>{text}</p>
        </Box>
      </Box>
    </Box>
  );
};

export { Review };
