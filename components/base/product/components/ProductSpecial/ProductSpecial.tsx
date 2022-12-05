import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ErrorIcon from '@mui/icons-material/Error';
import Rating from '@mui/material/Rating';

import { ModalAdvice } from 'components/main/ModalAdvice';
import { selectMetrics } from 'store/reducers/showcase/selectors';
import { sendMetrik } from 'utility/utils/metriks';
import { CONSULTATION_TEXT } from 'utility/utils/constants';

import { ProductSpecialProps } from './types';
import styles from './productSpecial.module.scss';
import { CustomButton } from 'components/ui/CustomButton';

const cn = classnames.bind(styles);

const ProductSpecial: FC<ProductSpecialProps> = ({
  isWarningMessage,
  averageRating,
  handleClickToReviews,
}) => {
  const [isModalAdviceOpen, setModalAdviceOpen] = useState<boolean>(false);

  const metrics = useSelector(selectMetrics);

  const openModalAdvice = () => {
    sendMetrik('reachGoal', metrics?.button_product_help, metrics?.metric_id);
    setModalAdviceOpen(true);
  };

  const openModalPartAdvice = () => {
    // sendMetrik('reachGoal', metrics?.button_part_help, metrics?.metric_id); TODO: добавить как появиться свойство на беке
    setModalAdviceOpen(true);
  };

  const openSpecialOffer = () => {
    sendMetrik(
      'reachGoal',
      metrics?.button_product_special,
      metrics?.metric_id,
    );
    setModalAdviceOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          order: { xs: -1, sm: 0 },
          alignItems: { xs: 'center', sm: 'start' },
        }}
        className={styles.productSpecialWrapper}
      >
        <CustomButton
          customStyles={styles.ratingBox}
          onClick={handleClickToReviews}
        >
          <Rating
            size='large'
            defaultValue={averageRating}
            precision={0.5}
            readOnly
          />
        </CustomButton>

        {isWarningMessage && (
          <Box className={styles.warningBox}>
            <ErrorIcon color='error' className={styles.warningIcon} />
            <Link
              href='#'
              onClick={openModalPartAdvice}
              className={styles.warningText}
            >
              {CONSULTATION_TEXT}
            </Link>
          </Box>
        )}

        <Box
          sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}
        >
          <div
            className={cn(styles.productSpecialItem, styles.helpIcon)}
            onClick={openModalAdvice}
          >
            Помочь с выбором
          </div>
          <div
            className={cn(styles.productSpecialItem, styles.specialIcon)}
            onClick={openSpecialOffer}
          >
            Спецпредложение
          </div>
        </Box>
      </Box>

      {isModalAdviceOpen && (
        <ModalAdvice
          isOpen={isModalAdviceOpen}
          setIsOpen={setModalAdviceOpen}
        />
      )}
    </>
  );
};

export { ProductSpecial };
