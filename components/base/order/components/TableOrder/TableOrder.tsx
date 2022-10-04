import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { clearCreateOrdering } from 'store/reducers/payment/actions';
import { selectMetrics } from 'store/reducers/showcase/selectors';
import { TotalBoxRedirectUrls } from 'utility/utils/constants';
import { useWindowSize } from 'hooks/useWindowSize';
import { sendMetrik } from 'utility/utils/metriks';

import { DesktopTableBody } from '../DesktopTableBody';
import { MobileTableBody } from '../MobileTableBody';
import { TableOrderProps } from '../../types';
import styles from '../../styles.module.scss';

const TableOrder: React.FC<TableOrderProps> = ({ order, orderTotal }) => {
  const { isMobile } = useWindowSize();

  const dispatch = useDispatch();
  const router = useRouter();

  const metrics = useSelector(selectMetrics);

  const SumbitOrder = () => {
    sendMetrik('reachGoal', metrics.button_buy_submit);
    dispatch(clearCreateOrdering());
    router.push(TotalBoxRedirectUrls.PAYMENT);
  };

  return (
    <>
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
