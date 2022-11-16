import React, { FC } from 'react';
import Box from '@mui/system/Box';
import StarRateSharpIcon from '@mui/icons-material/StarRateSharp';

import { RatingProps } from '../types';
import styles from '../catalogCard.module.scss';

const Rating: FC<RatingProps> = ({ averageRating }) => {
  const rating = Number(averageRating).toFixed(1);

  return (
    <Box className={styles.ratingBox}>
      <StarRateSharpIcon sx={{ fontSize: '18px' }} />
      <span className={styles.ratingNumber}>{rating}</span>
    </Box>
  );
};

export { Rating };
