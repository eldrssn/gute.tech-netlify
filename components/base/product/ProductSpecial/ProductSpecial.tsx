import React, { FC, useState } from 'react';
import classnames from 'classnames/bind';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { useWindowSize } from 'hooks/useWindowSize';
import { checkMobileView } from 'utility/helpers/checkViewType';

import ModalAdvice from 'components/main/ModalAdvice';

import styles from './productSpecial.module.scss';

const cn = classnames.bind(styles);

const ProductSpecial: FC = () => {
  const [isModalAdviceOpen, setModalAdviceOpen] = useState<boolean>(false);

  const openModalAdvice = () => {
    setModalAdviceOpen(true);
  };

  const { windowWidth } = useWindowSize();
  const isMobileView = checkMobileView(windowWidth);

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
          [styles.mobileView]: isMobileView,
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
          onClick={openModalAdvice}
        >
          Спецпредложение
        </Link>
      </Box>

      <ModalAdvice isOpen={isModalAdviceOpen} setIsOpen={setModalAdviceOpen} />
    </>
  );
};

export { ProductSpecial };
