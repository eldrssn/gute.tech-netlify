import React, { useState } from 'react';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import { checkMobileView } from 'utility/helpers/checkViewType';
import {
  addItemQuantity,
  removeItemQuantity,
  removeItemFromCart,
} from 'store/reducers/cart/actions';
import { useWindowSize } from 'hooks/useWindowSize';
import { ModalAdvice } from 'components/main/ModalAdvice';

import { DesktopTableBody } from '../DesktopTableBody';
import { MobileTableBody } from '../MobileTableBody';
import { TStateProps, CartItemData } from '../../types';
import styles from '../../styles.module.scss';

const TableOrder: React.FC<TStateProps> = ({ cart, orderTotal }) => {
  const [isModalAdviceOpen, setModalAdviceOpen] = useState(false);
  const { windowWidth } = useWindowSize();
  const dispatch = useDispatch();
  const addCount = (item: CartItemData) => {
    dispatch(addItemQuantity(item.slug));
  };
  const removeCount = (item: CartItemData) => {
    dispatch(removeItemQuantity(item.slug));
  };
  const removeItem = (item: CartItemData) => {
    dispatch(removeItemFromCart(item.slug));
  };

  const isMobileView = checkMobileView(windowWidth);

  const openModalAdvice = () => {
    setModalAdviceOpen(true);
  };

  return (
    <>
      <ModalAdvice isOpen={isModalAdviceOpen} setIsOpen={setModalAdviceOpen} />
      <Table className={styles.table} aria-label='simple table'>
        {isMobileView ? null : (
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell>Товар</TableCell>
              <TableCell align='right'>Цена</TableCell>
              <TableCell align='right'>Кол-во и остаток</TableCell>
              <TableCell align='right'>Стоимость</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
        )}
        {isMobileView ? (
          <MobileTableBody
            cart={cart}
            addCount={addCount}
            removeCount={removeCount}
            removeItem={removeItem}
          />
        ) : (
          <DesktopTableBody
            cart={cart}
            addCount={addCount}
            removeCount={removeCount}
            removeItem={removeItem}
          />
        )}
      </Table>
      <Box className={styles.bottomOrderBox} component='div'>
        <MenuItem onClick={openModalAdvice} className={styles.menuItem}>
          Помочь с выбором товара
        </MenuItem>
        <MenuItem onClick={openModalAdvice} className={styles.menuItem}>
          Получить спецпредложение
        </MenuItem>
        <Typography className={styles.orderTotal}>
          Всего: {orderTotal}&#8381;
        </Typography>
      </Box>
    </>
  );
};

export { TableOrder };
