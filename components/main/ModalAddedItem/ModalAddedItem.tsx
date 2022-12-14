/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { CloseIcon } from 'components/ui/CloseIcon';
import { ModalWrapper } from 'components/main/ModalWrapper';
import {
  addProductToCartAuthorized,
  addProductToCartUnAuthorized,
} from 'store/reducers/cart/actions';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { selectSelectedCitySlug } from 'store/reducers/regions/selectors';

import { TOuterProps } from './types';
import styles from './styles.module.scss';

const ModalAddedItem: React.FC<TOuterProps> = ({
  isOpen,
  setIsOpen,
  withInstallation,
  title,
  slug,
}) => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector(selectIsAuthorized);
  const selectedCitySlug = useSelector(selectSelectedCitySlug);
  const transportId = useSelector(selectTransportId);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(
        addProductToCartAuthorized({
          product: slug,
          quantity: 1,
          with_installation: withInstallation,
          transport: transportId,
          city: selectedCitySlug,
        }),
      );
      return;
    }

    dispatch(
      addProductToCartUnAuthorized({
        product: slug,
        quantity: 1,
        with_installation: withInstallation,
        transport: transportId,
        city: selectedCitySlug,
      }),
    );
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle='added-item'
      initialFocus='#go-to-cart'
    >
      <Container fixed className={styles.wrap}>
        <Box className={styles.closeModal} onClick={closeModal}>
          <CloseIcon fillColor='black' />
        </Box>
        <Typography className={styles.title}>&quot;{title}&quot;</Typography>
        <Typography className={styles.action}>добавлен в корзину</Typography>
        <Link href='/cart' passHref>
          <Button id='go-to-cart' className={styles.button}>
            Перейти в Корзину
          </Button>
        </Link>
        <Button onClick={closeModal} className={styles.button}>
          Продолжить покупки
        </Button>
      </Container>
    </ModalWrapper>
  );
};

export { ModalAddedItem };
