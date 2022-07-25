import React from 'react';
import Image from 'next/image';
import { TableBody, TableCell, TableRow, Typography, Box } from '@mui/material';

import { formatPrice } from 'utility/helpers';

import { TTableBodyProps } from '../../types';
import styles from './MobileTableBody.module.scss';

const MobileTableBody: React.FC<TTableBodyProps> = ({ order }) => {
  return (
    <TableBody className={styles.tableBody}>
      {order.map((item) => {
        const itemPrice = formatPrice(item.price);
        const countItemsPrice = formatPrice(item.count * item.price);

        return (
          <TableRow
            key={item.slug}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell
              component='th'
              scope='row'
              className={styles.tableBodyName}
            >
              <Box className={styles.imageBox}>
                <Image
                  height='150px'
                  width='150px'
                  src='/germanika/deflectors.jpg'
                  alt='item'
                />
              </Box>
            </TableCell>
            <TableCell className={styles.itemInfo}>
              <Typography className={styles.itemTitle}>{item.title}</Typography>
              <Typography className={styles.itemPrice}>
                Цена: {itemPrice}&#8381;{' '}
              </Typography>
              <Typography className={styles.itemCost}>
                Количество: {item.count}&#8381;
              </Typography>
              <Typography className={styles.itemCost}>
                Стоимость: {countItemsPrice}&#8381;
              </Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export { MobileTableBody };
