import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { clearCreateOrdering } from 'store/reducers/payment/actions';
import { selectMetrics } from 'store/reducers/showcase/selectors';
import { setItemsFromOrder, setItemsSlugs } from 'store/reducers/order/actions';
import { useWindowSize } from 'hooks/useWindowSize';
import { ModalAdvice } from 'components/main/ModalAdvice';
import { TotalBoxRedirectUrls } from 'utility/utils/constants';
import { sendMetrik } from 'utility/utils/metriks';

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
  cartCheckedItemsTotal,
  isError,
  isLoading,
}) => {
  const [isModalAdviceOpen, setModalAdviceOpen] = useState(false);
  const { isMobile } = useWindowSize();

  const router = useRouter();
  const dispatch = useDispatch();

  const metrics = useSelector(selectMetrics);

  const checkedCartItems = getCheckedCartItems(cart);
  const checkedCartItemsSlug = getCheckedCartItemsSlug(checkedCartItems);

  const isAllItemsSelect = cart.length === checkedCartItems.length;

  const openModalAdvice = () => {
    sendMetrik('reachGoal', metrics?.button_cart_help, metrics?.metric_id);
    setModalAdviceOpen(true);
  };

  const openSpecialOffer = () => {
    sendMetrik('reachGoal', metrics?.button_cart_special, metrics?.metric_id);
    setModalAdviceOpen(true);
  };

  const SumbitOrder = () => {
    if (checkedCartItemsSlug.length <= 0) {
      return;
    }

    sendMetrik('reachGoal', metrics?.button_cart_submit, metrics?.metric_id);
    dispatch(clearCreateOrdering());
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
        {!isMobile && (
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell>??????????</TableCell>
              <TableCell align='right'>????????</TableCell>
              <TableCell
                align='right'
                sx={{
                  whiteSpace: 'nowrap',
                }}
              >
                ??????-???? ?? ??????????????
              </TableCell>
              <TableCell align='right'>??????????????????</TableCell>
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
              ???????????? ?? ?????????????? ????????????
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={openSpecialOffer}
            className={cn(styles.menuItem, styles.menuItemSpecialOffer)}
          >
            <Typography className={styles.specialOffer}>
              ???????????????? ??????????????????????????????
            </Typography>
          </MenuItem>
        </Box>
        <Box className={styles.orderBox}>
          <Typography className={styles.orderTotal}>
            ?????????? ????????????: {orderTotal}&#8381;
          </Typography>
          <Typography className={styles.orderTotal}>
            ??????????: {cartCheckedItemsTotal}&#8381;
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
