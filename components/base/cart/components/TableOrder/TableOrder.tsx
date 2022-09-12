import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Box,
  Button,
} from '@mui/material';
import cn from 'classnames';

import { setItemsFromOrder, setItemsSlugs } from 'store/reducers/order/actions';
import { useWindowSize } from 'hooks/useWindowSize';
import { ModalAdvice } from 'components/main/ModalAdvice';
import { TotalBoxRedirectUrls } from 'utility/utils/constants';

import { Error } from '../Error';
import { DesktopTableBody } from '../DesktopTableBody';
import { MobileTableBody } from '../MobileTableBody';
import { BUTTON_TITLE_ORDER, BUTTON_TITLE_PAYMENT } from '../../constants';
import { getCheckedCartItemsSlug, getCheckedCartItems } from '../../helpers';
import { TTableOrderProps } from '../../types';
import styles from '../../styles.module.scss';

const TableOrder: React.FC<TTableOrderProps> = ({
  cart,
  orderTotal,
  isError,
  isLoading,
}) => {
  const [isModalAdviceOpen, setModalAdviceOpen] = useState(false);
  const { isMobile } = useWindowSize();

  const router = useRouter();
  const dispatch = useDispatch();

  const checkedCartItems = getCheckedCartItems(cart);
  const checkedCartItemsSlug = getCheckedCartItemsSlug(checkedCartItems);

  const isAllItemsSelect = cart.length === checkedCartItems.length;

  const openModalAdvice = () => {
    setModalAdviceOpen(true);
  };

  const SumbitOrder = () => {
    dispatch(setItemsSlugs(checkedCartItemsSlug));
    dispatch(setItemsFromOrder(checkedCartItems));
    router.push(
      isAllItemsSelect
        ? TotalBoxRedirectUrls.PAYMENT
        : TotalBoxRedirectUrls.ORDER,
    );
  };

  const submitButtonTitle = isAllItemsSelect
    ? BUTTON_TITLE_PAYMENT
    : BUTTON_TITLE_ORDER;

  return isError ? (
    <Error />
  ) : (
    <>
      {isModalAdviceOpen && (
        <ModalAdvice
          isOpen={isModalAdviceOpen}
          setIsOpen={setModalAdviceOpen}
        />
      )}
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
          <MobileTableBody cart={cart} isLoading={isLoading} />
        ) : (
          <DesktopTableBody cart={cart} isLoading={isLoading} />
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
        <Box className={styles.orderBox}>
          <Typography className={styles.orderTotal}>
            Сумма заказа: {orderTotal}&#8381;
          </Typography>
          <Button
            className={styles.orderButton}
            onClick={SumbitOrder}
            variant={'contained'}
          >
            {submitButtonTitle}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export { TableOrder };
