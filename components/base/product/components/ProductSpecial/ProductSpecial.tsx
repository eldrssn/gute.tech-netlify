import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { ModalAdvice } from 'components/main/ModalAdvice';
import { selectMetrics } from 'store/reducers/showcase/selectors';
import { useWindowSize } from 'hooks/useWindowSize';
import { sendMetrik } from 'utility/utils/metriks';

import styles from './productSpecial.module.scss';

const cn = classnames.bind(styles);

const ProductSpecial: FC = () => {
  const [isModalAdviceOpen, setModalAdviceOpen] = useState<boolean>(false);

  const metrics = useSelector(selectMetrics);

  const openModalAdvice = () => {
    sendMetrik('reachGoal', metrics.button_product_help, metrics.metric_id);
    setModalAdviceOpen(true);
  };

  const openSpecialOffer = () => {
    sendMetrik('reachGoal', metrics.button_product_special, metrics.metric_id);
    setModalAdviceOpen(true);
  };

  const { isMobile } = useWindowSize();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          order: { xs: -1, sm: 0 },
          alignItems: { xs: 'center', sm: 'start' },
        }}
        className={cn(styles.productSpecialWrapper, {
          [styles.mobileView]: isMobile,
        })}
      >
        <Link
          className={cn(styles.productSpecialItem, styles.helpIcon)}
          href='#'
          onClick={openModalAdvice}
        >
          Помочь с выбором
        </Link>
        <Link
          className={cn(styles.productSpecialItem, styles.specialIcon)}
          href='#'
          onClick={openSpecialOffer}
        >
          Спецпредложение
        </Link>
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
