import React from 'react';
import { useRouter } from 'next/router';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Button,
} from '@mui/material';

import { TotalBoxRedirectUrls } from 'utility/utils/constants';
import { useWindowSize } from 'hooks/useWindowSize';

import { DesktopTableBody } from '../DesktopTableBody';
import { MobileTableBody } from '../MobileTableBody';
import { TableOrderProps } from '../../types';
import styles from '../../styles.module.scss';

const TableOrder: React.FC<TableOrderProps> = ({ order, orderTotal }) => {
  const { isMobile } = useWindowSize();

  const router = useRouter();

  const SumbitOrder = () => {
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
