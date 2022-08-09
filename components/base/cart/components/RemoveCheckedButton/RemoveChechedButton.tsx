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
import {
  removeItemBySlug,
  resetOrdinalId,
  setAllChecked,
  clearCheckedItems,
} from 'store/reducers/cart/actions';
import { useWindowSize } from 'hooks/useWindowSize';

import {
  MIN_NUMBER_ITEMS_IN_CART,
  MIN_NUMBER_SELECTED_ITEMS,
} from '../../constants';
import { getCheckedCartItems, getCheckedCartItemsSlug } from '../../helpers';
import { TRemoveCheckedButtonProps } from '../../types';
import styles from './styles.module.scss';

const RemoveCheckedButton: React.FC<TRemoveCheckedButtonProps> = ({ cart }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();

  const checkedCartItems = getCheckedCartItems(cart);
  const checkedCartItemsSlug = getCheckedCartItemsSlug(checkedCartItems);

  const isAllItemsSelect = cart.length === checkedCartItems.length;
  const isRemovedItemsEmpty =
    checkedCartItems.length <= MIN_NUMBER_SELECTED_ITEMS;
  const isCartEmpty = cart.length <= MIN_NUMBER_ITEMS_IN_CART;

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      dispatch(setAllChecked());
      return;
    }

    dispatch(clearCheckedItems());
  };

  const confirmedSolution = () => {
    dispatch(removeItemBySlug(checkedCartItemsSlug));
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
      {isMobile && (
        <Typography className={styles.selectedTitle}>
          Выбрано: {checkedCartItems.length}
        </Typography>
      )}
      <Box className={styles.checkboxContainer}>
        <FormControlLabel
          className={styles.checkboxSelectAll}
          label='Выделить все'
          control={
            <Checkbox
              onChange={(event) => handleChangeCheckBox(event)}
              checked={isAllItemsSelect && !isCartEmpty}
              disabled={isCartEmpty}
            />
          }
        />
        {!isMobile && (
          <Typography className={styles.selectedTitle}>
            Выбрано: {checkedCartItems.length}
          </Typography>
        )}
        <Button
          disabled={isRemovedItemsEmpty}
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
