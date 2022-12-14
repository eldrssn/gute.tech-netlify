import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import cn from 'classnames';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { setAllChecked, clearCheckedItems } from 'store/reducers/cart/actions';
import {
  updateCartItemUnAuthorized,
  updateCartItemAuthorized,
} from 'store/reducers/cart/actions';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { selectSelectedCitySlug } from 'store/reducers/regions/selectors';
import { useWindowSize } from 'hooks/useWindowSize';

import {
  MIN_NUMBER_ITEMS_IN_CART,
  MIN_NUMBER_SELECTED_ITEMS,
} from '../../constants';
import { getCheckedCartItems, getCheckedCartItemsSlug } from '../../helpers';
import { TRemoveCheckedButtonProps } from '../../types';
import styles from './styles.module.scss';

const RemoveCheckedButton: React.FC<TRemoveCheckedButtonProps> = ({
  cart,
  isLoading,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isMobile } = useWindowSize();
  const dispatch = useDispatch();

  const checkedCartItems = getCheckedCartItems(cart);
  const checkedCartItemsSlug = getCheckedCartItemsSlug(checkedCartItems);

  const isAllItemsSelect = cart.length === checkedCartItems.length;
  const isRemovedItemsEmpty =
    checkedCartItems.length <= MIN_NUMBER_SELECTED_ITEMS;
  const isCartEmpty = cart.length <= MIN_NUMBER_ITEMS_IN_CART;

  const selectedCitySlug = useSelector(selectSelectedCitySlug);
  const transportId = useSelector(selectTransportId);
  const isAuthorized = useSelector(selectIsAuthorized);

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      dispatch(setAllChecked());
      return;
    }

    dispatch(clearCheckedItems());
  };

  const confirmedSolution = () => {
    const deleteArray = checkedCartItemsSlug.map((item) => {
      return { product: item, quantity: 0, with_installation: false };
    });

    if (isAuthorized)
      dispatch(
        updateCartItemAuthorized({
          items: deleteArray,
          city: selectedCitySlug,
          transport: transportId,
        }),
      );

    if (!isAuthorized) {
      dispatch(
        updateCartItemUnAuthorized({
          items: deleteArray,
          city: selectedCitySlug,
          transport: transportId,
        }),
      );
    }

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
      <ModalWrapper
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        modalTitle='remove-checked'
      >
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
          disabled={isLoading}
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
          className={cn(styles.button, { [styles.buttonDisabled]: isLoading })}
        >
          {isAllItemsSelect ? 'Очистить корзину' : 'Очистить выбранное'}
        </Button>
      </Box>
    </>
  );
};

export { RemoveCheckedButton };
