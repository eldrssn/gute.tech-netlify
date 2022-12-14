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
import ErrorIcon from '@mui/icons-material/Error';

import { ModalCity } from 'components/main/ModalCity';
import {
  selectSelectedCitySlug,
  selectSelectedBranchId,
  selectBranches,
} from 'store/reducers/regions/selectors';
import { clearCreateOrdering } from 'store/reducers/payment/actions';
import { selectMetrics } from 'store/reducers/showcase/selectors';
import { setItemsFromOrder, setItemsSlugs } from 'store/reducers/order/actions';
import { useWindowSize } from 'hooks/useWindowSize';
import { ModalAdvice } from 'components/main/ModalAdvice';
import { TotalBoxRedirectUrls } from 'utility/utils/constants';
import { sendMetrik } from 'utility/utils/metriks';
import { getBranches, getBranch } from 'utility/helpers';

import { Error } from '../Error';
import { DesktopTableBody } from '../DesktopTableBody';
import { MobileTableBody } from '../MobileTableBody';
import {
  BUTTON_TITLE_PAYMENT,
  BUTTON_TITLE_CHANGE_ADRESS,
} from '../../constants';
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
  const [isModalCityOpen, setIsModalCityOpen] = useState(false);
  const [isModalAdviceOpen, setModalAdviceOpen] = useState(false);
  const { isMobile } = useWindowSize();

  const router = useRouter();
  const dispatch = useDispatch();

  const metrics = useSelector(selectMetrics);
  const selectedCitySlug = useSelector(selectSelectedCitySlug);
  const selectedBranchId = useSelector(selectSelectedBranchId);
  const { data: branches } = useSelector(selectBranches);

  const selectedBranches = getBranches(branches, selectedCitySlug);
  const selectedBranch = getBranch(
    selectedBranches?.branches,
    selectedBranchId,
  );

  const selectedCityTitle = selectedBranches?.title;
  const selectedBranchStreet = selectedBranch?.street;

  const checkedCartItems = getCheckedCartItems(cart);
  const checkedCartItemsSlug = getCheckedCartItemsSlug(checkedCartItems);

  const openModalAdvice = () => {
    sendMetrik('reachGoal', metrics?.button_cart_help, metrics?.metric_id);
    setModalAdviceOpen(true);
  };

  const openSpecialOffer = () => {
    sendMetrik('reachGoal', metrics?.button_cart_special, metrics?.metric_id);
    setModalAdviceOpen(true);
  };

  const openModalCity = () => {
    setIsModalCityOpen(true);
  };

  const SumbitOrder = () => {
    if (checkedCartItemsSlug.length <= 0) {
      return;
    }

    sendMetrik('reachGoal', metrics?.button_cart_submit, metrics?.metric_id);
    dispatch(clearCreateOrdering());
    dispatch(setItemsSlugs(checkedCartItemsSlug));
    dispatch(setItemsFromOrder(checkedCartItems));
    router.push(TotalBoxRedirectUrls.PAYMENT);
  };

  const submitButtonTitle = BUTTON_TITLE_PAYMENT;

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
      {isModalCityOpen && (
        <ModalCity isOpen={isModalCityOpen} setIsOpen={setIsModalCityOpen} />
      )}
      <Table className={styles.table} aria-label='simple table'>
        {!isMobile && (
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell>Товар</TableCell>
              <TableCell align='right'>Цена</TableCell>
              <TableCell
                align='right'
                sx={{
                  whiteSpace: 'nowrap',
                }}
              >
                Кол-во и остаток
              </TableCell>
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
      <Box className={styles.deliveryAdress}>
        <Box className={styles.deliveryAdressInfoBox}>
          <Typography className={styles.cityTitle}>Адрес доставки: </Typography>
          <Typography className={styles.cityInfo}>
            {selectedCityTitle}, {selectedBranchStreet}
          </Typography>
        </Box>
        <Box className={styles.deliveryAdressButtonBox}>
          <Button
            className={styles.cityButton}
            onClick={openModalCity}
            variant={'contained'}
          >
            {BUTTON_TITLE_CHANGE_ADRESS}
          </Button>
          <Box className={styles.changeAttentionBox}>
            <ErrorIcon
              sx={{ fontSize: '28px', marginRight: '5px' }}
              color='error'
            />
            <Typography className={styles.deliveryAttention}>
              При изменении адреса цена товаров и услуг может измениться
            </Typography>
          </Box>
        </Box>
      </Box>
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
            onClick={openSpecialOffer}
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
          <Typography className={styles.orderTotal}>
            Итого: {cartCheckedItemsTotal}&#8381;
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
