import React from 'react';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';

import { useWindowSize } from 'hooks/useWindowSize';

import { ProductTableDesktop } from '../ProductTableDesktop';

import { TableBodyProps } from '../types';
import styles from './styles.module.scss';

const ProductTable: React.FC<TableBodyProps> = ({ products }) => {
  const { isMobile } = useWindowSize();

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
        <ProductTableDesktop products={products} />
      ) : (
        <ProductTableDesktop products={products} />
      )}
    </Table>
  );
};

export { ProductTable };
