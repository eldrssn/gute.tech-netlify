import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  Container,
  Typography,
} from '@mui/material';
import cn from 'classnames';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { removeItemBySlug, resetOrdinalId } from 'store/reducers/cart/actions';

import { TRemoveCheckedButtonProps } from '../../types';
import styles from './styles.module.scss';

const RemoveCheckedButton: React.FC<TRemoveCheckedButtonProps> = ({
  cart,
  slugsRemovedElements,
  setSlugsRemovedElements,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const isAllItemsSelect = cart.length === slugsRemovedElements.length;
  const isRemovedItem = slugsRemovedElements.length <= 0;
  const isCartItem = cart.length <= 0;

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const SlugsAllItems = cart.map((item) => item.slug);

    if (isChecked) {
      setSlugsRemovedElements(SlugsAllItems);
      return;
    }

    setSlugsRemovedElements([]);
  };

  const confirmedSolution = () => {
    setSlugsRemovedElements([]);
    dispatch(removeItemBySlug(slugsRemovedElements));
    dispatch(resetOrdinalId());
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <ModalWrapper isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box component='div' className={styles.confirmedBlock}>
            <Typography className={styles.titleModal}>
              Вы действительно хотите удалить выбранные товары из корзины?
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
                onClick={closeModal}
              >
                Отмена
              </Button>
            </Box>
          </Box>
        </Container>
      </ModalWrapper>
      <Box className={styles.checkboxContainer}>
        <FormControlLabel
          className={styles.checkboxSelectAll}
          label='Выделить все'
          control={
            <Checkbox
              onChange={(event) => handleChangeCheckBox(event)}
              checked={isAllItemsSelect && !isCartItem}
              disabled={isCartItem}
            />
          }
        />
        <Button
          disabled={isRemovedItem}
          onClick={openModal}
          className={styles.button}
        >
          {isAllItemsSelect ? 'Очистить корзину' : 'Очистить выбранное'}
        </Button>
      </Box>
    </>
  );
};

export { RemoveCheckedButton };
