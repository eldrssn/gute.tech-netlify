import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { selectOrderTotal } from 'store/reducers/user/selectors';
import { useWindowSize } from 'hooks/useWindowSize';

import { ProductTableDesktop } from '../ProductTableDesktop';
import { ProductTableMobile } from '../ProductTableMobile';
import { TableBodyProps } from '../../types';
import styles from './styles.module.scss';

const ProductTable: React.FC<TableBodyProps> = ({ products }) => {
  const { isMobile } = useWindowSize();

  const totalCost = useSelector(selectOrderTotal);

  return (
    <>
      <Table className={styles.table} aria-label='simple table'>
        {!isMobile && (
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
      </Table>
      <Typography className={styles.totalCost}>
        Итого: {totalCost}&#8381;
      </Typography>
    </>
  );
};

export { ProductTable };
