import React, { FC } from 'react';

import { ReviewsBoxProps } from '../../types';
import { Review } from '../Review';

import styles from './reviewsBox.module.scss';

const ReviewsBox: FC<ReviewsBoxProps> = ({ reviewsList }) => {
  const isReviewsExist = reviewsList && reviewsList.length > 0;

  return (
    <>
      {isReviewsExist ? (
        reviewsList.map((review) => (
          <Review key={review.created_at} item={review} />
        ))
      ) : (
        <p className={styles.noReviewsText}>На данный товар отзывов пока нет</p>
      )}
    </>
  );
};

export { ReviewsBox };
