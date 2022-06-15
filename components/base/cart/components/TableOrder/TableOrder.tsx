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
import cn from 'classnames';

import {
  addItemQuantity,
  removeItemQuantity,
  removeItemFromCart,
} from 'store/reducers/cart/actions';
import { useWindowSize } from 'hooks/useWindowSize';
import { ModalAdvice } from 'components/main/ModalAdvice';

import { DesktopTableBody } from '../DesktopTableBody';
import { MobileTableBody } from '../MobileTableBody';
import { TTableOrderProps, CartItemData } from '../../types';
import styles from '../../styles.module.scss';

const TableOrder: React.FC<TTableOrderProps> = ({
  cart,
  orderTotal,
  setSlugsRemovedElements,
  slugsRemovedElements,
}) => {
  const [isModalAdviceOpen, setModalAdviceOpen] = useState(false);
  const { isMobile } = useWindowSize();
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

  const openModalAdvice = () => {
    setModalAdviceOpen(true);
  };

  return (
    <>
      <ModalAdvice isOpen={isModalAdviceOpen} setIsOpen={setModalAdviceOpen} />
      <Table className={styles.table} aria-label='simple table'>
        {isMobile ? null : (
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
        {isMobile ? (
          <MobileTableBody
            cart={cart}
            addCount={addCount}
            removeCount={removeCount}
            removeItem={removeItem}
            setSlugsRemovedElements={setSlugsRemovedElements}
            slugsRemovedElements={slugsRemovedElements}
          />
        ) : (
          <DesktopTableBody
            cart={cart}
            addCount={addCount}
            removeCount={removeCount}
            removeItem={removeItem}
            setSlugsRemovedElements={setSlugsRemovedElements}
            slugsRemovedElements={slugsRemovedElements}
          />
        )}
      </Table>
      <Box className={styles.bottomOrderBox} component='div'>
        <Box className={styles.action}>
          <MenuItem
            onClick={openModalAdvice}
            className={cn(styles.menuItem, styles.menuItemSpecialOffer)}
          >
            <Typography className={styles.specialOffer}>
              Помочь с выбором товара
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={openModalAdvice}
            className={cn(styles.menuItem, styles.menuItemSpecialOffer)}
          >
            <Typography className={styles.specialOffer}>
              Получить спецпредложение
            </Typography>
          </MenuItem>
        </Box>
        <Typography className={styles.orderTotal}>
          Всего: {orderTotal}&#8381;
        </Typography>
      </Box>
    </>
  );
};

export { TableOrder };
