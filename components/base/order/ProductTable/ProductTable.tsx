import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { selectOrderTotal } from 'store/reducers/user/selectors';
import { useWindowSize } from 'hooks/useWindowSize';

import { ProductTableDesktop } from '../ProductTableDesktop';
import { ProductTableMobile } from '../ProductTableMobile';
import { TableBodyProps } from '../types';
import styles from './styles.module.scss';

const ProductTable: React.FC<TableBodyProps> = ({ products }) => {
  const { isMobile } = useWindowSize();

  const totalCost = useSelector(selectOrderTotal);

  return (
    <Table className={styles.table} aria-label='simple table'>
      {isMobile ? null : (
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell>Товар</TableCell>
            <TableCell align='right'>Цена</TableCell>
            <TableCell align='right'>Кол-во</TableCell>
            <TableCell align='right'>Стоимость</TableCell>
          </TableRow>
        </TableHead>
      )}
      {isMobile ? (
        <ProductTableMobile products={products} />
      ) : (
        <ProductTableDesktop products={products} />
      )}
      <Typography className={styles.totalCost}>
        Итого: {totalCost}&#8381;
      </Typography>
    </Table>
  );
};

export { ProductTable };
