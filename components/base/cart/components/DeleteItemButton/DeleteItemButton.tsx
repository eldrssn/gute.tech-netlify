import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import cn from 'classnames';

import { ModalWrapper } from 'components/main/ModalWrapper';
import {
  updateCartItemAuthorized,
  updateCartItemUnAuthorized,
} from 'store/reducers/cart/actions';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import { CloseIcon } from 'components/ui/CloseIcon';

import { TDeleteItemButtonProps } from '../../types';
import styles from './DeleteItemButton.module.scss';

const DeleteItemButton: React.FC<TDeleteItemButtonProps> = ({
  item,
  isLoading,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();

  const isAuthorized = useSelector(selectIsAuthorized);

  const handleClick = () => {
    if (isLoading) {
      return;
    }

    setIsOpenModal(true);
  };

  const confirmedSolution = () => {
    if (isAuthorized) {
      dispatch(updateCartItemAuthorized([{ product: item.slug, quantity: 0 }]));
    }

    if (!isAuthorized) {
      dispatch(
        updateCartItemUnAuthorized([{ product: item.slug, quantity: 0 }]),
      );
    }

    setIsOpenModal(false);
  };

  return (
    <>
      <ModalWrapper
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        modalTitle='delete-item'
      >
        <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box component='div' className={styles.confirmedBlock}>
            <Typography className={styles.titleModal}>
              Вы действительно хотите удалить
              <Typography
                sx={{ fontWeight: 'bold' }}
                className={styles.nameProduct}
              >
                &#8222;
                {item.title}&#8220;
              </Typography>{' '}
              из корзины?
            </Typography>
            <Box className={styles.buttonContainer}>
              <Button
                className={cn(styles.btnSolution, styles.btnAccept)}
                onClick={confirmedSolution}
              >
                Ок
              </Button>
              <Button
                className={cn(styles.btnSolution, styles.btnReject)}
                onClick={() => setIsOpenModal(false)}
              >
                Отмена
              </Button>
            </Box>
          </Box>
        </Container>
      </ModalWrapper>
      <Button
        className={cn(styles.btnDelete, {
          [styles.btnDeleteInactive]: isLoading,
        })}
        onClick={handleClick}
      >
        <CloseIcon />
      </Button>
    </>
  );
};

export { DeleteItemButton };
