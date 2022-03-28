import React from 'react';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import {
  addItemQuantity,
  removeItemQuantity,
  removeItemFromCart,
} from 'store/reducers/cart/actions';
import { useWindowSize } from 'hooks/useWindowSize';
import DesktopTableBody from './DesktopTableBody';
import MobileTableBody from './MobileTableBody';

import { TStateProps, CartItemData } from '../types';
import styles from '../styles.module.css';

const TableOrder: React.FC<TStateProps> = ({ cart, orderTotal }) => {
  const { windowWidth } = useWindowSize();
  const dispatch = useDispatch();
  const addCount = (item: CartItemData) => {
    dispatch(addItemQuantity(item.id));
  };
  const removeCount = (item: CartItemData) => {
    dispatch(removeItemQuantity(item.id));
  };
  const removeItem = (item: CartItemData) => {
    dispatch(removeItemFromCart(item.id));
  };

  type WindowSideType = number | null;

  const isMobileView = (windowWidth: WindowSideType) =>
    windowWidth && windowWidth <= 720;

  return (
    <>
      <Table className={styles.table} aria-label='simple table'>
        {isMobileView(windowWidth) ? null : (
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
        {isMobileView(windowWidth) ? (
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
      <Typography className={styles.orderTotal}>
        Всего: {orderTotal}&#8381;
      </Typography>
    </>
  );
};

export default TableOrder;
