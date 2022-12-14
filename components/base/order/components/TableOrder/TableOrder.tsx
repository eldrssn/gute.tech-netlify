import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ErrorIcon from '@mui/icons-material/Error';

import { ModalCity } from 'components/main/ModalCity';
import { clearCreateOrdering } from 'store/reducers/payment/actions';
import { selectMetrics } from 'store/reducers/showcase/selectors';
import {
  selectSelectedCitySlug,
  selectSelectedBranchId,
  selectBranches,
} from 'store/reducers/regions/selectors';
import { TotalBoxRedirectUrls } from 'utility/utils/constants';
import { useWindowSize } from 'hooks/useWindowSize';
import { sendMetrik } from 'utility/utils/metriks';
import { getBranches, getBranch } from 'utility/helpers';

import { DesktopTableBody } from '../DesktopTableBody';
import { MobileTableBody } from '../MobileTableBody';
import { TableOrderProps } from '../../types';
import { BUTTON_TITLE_CHANGE_ADRESS } from '../../constants';
import styles from '../../styles.module.scss';

const TableOrder: React.FC<TableOrderProps> = ({ order, orderTotal }) => {
  const [isModalCityOpen, setIsModalCityOpen] = useState(false);
  const { isMobile } = useWindowSize();

  const dispatch = useDispatch();
  const router = useRouter();

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

  const openModalCity = () => {
    setIsModalCityOpen(true);
  };

  const SumbitOrder = () => {
    sendMetrik('reachGoal', metrics?.button_buy_submit, metrics?.metric_id);
    dispatch(clearCreateOrdering());
    router.push(TotalBoxRedirectUrls.PAYMENT);
  };

  return (
    <>
      {isModalCityOpen && (
        <ModalCity isOpen={isModalCityOpen} setIsOpen={setIsModalCityOpen} />
      )}
      <Table className={styles.table} aria-label='simple table'>
        {!isMobile && (
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
          <MobileTableBody order={order} />
        ) : (
          <DesktopTableBody order={order} />
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
        <Box className={styles.orderBox}>
          <Typography className={styles.orderTotal}>
            К оплате: {orderTotal}&#8381;
          </Typography>
          <Button
            className={styles.orderButton}
            onClick={SumbitOrder}
            variant={'contained'}
          >
            Оформить заказ
          </Button>
        </Box>
      </Box>
    </>
  );
};

export { TableOrder };
