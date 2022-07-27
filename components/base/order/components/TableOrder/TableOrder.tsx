import React from 'react';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';

import { useWindowSize } from 'hooks/useWindowSize';

import { DesktopTableBody } from '../DesktopTableBody';
import { MobileTableBody } from '../MobileTableBody';
import { TableOrderProps } from '../../types';
import styles from '../../styles.module.scss';

const TableOrder: React.FC<TableOrderProps> = ({ order }) => {
  const { isMobile } = useWindowSize();

  return (
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
        <MobileTableBody order={order} />
      ) : (
        <DesktopTableBody order={order} />
      )}
    </Table>
  );
};

export { TableOrder };
