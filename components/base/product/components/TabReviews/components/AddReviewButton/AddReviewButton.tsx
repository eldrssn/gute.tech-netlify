import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuthorized } from 'store/reducers/authentication/selectors';

import { ModalAddProductReview } from 'components/main/ModalAddProductReview';
import { CustomButton } from 'components/ui/CustomButton';

const AddReviewButton = () => {
  const [isModalAddReviewOpen, setIsModalAddReviewOpen] = useState(false);
  const isAuthorized = useSelector(selectIsAuthorized);

  const handleClickButton = () => {
    setIsModalAddReviewOpen(true);
  };

  return (
    <>
      <CustomButton disabled={!isAuthorized} onClick={handleClickButton}>
        Добавить отзыв
      </CustomButton>

      {isModalAddReviewOpen && (
        <ModalAddProductReview
          isOpen={isModalAddReviewOpen}
          setIsOpen={setIsModalAddReviewOpen}
        />
      )}
    </>
  );
};

export { AddReviewButton };
