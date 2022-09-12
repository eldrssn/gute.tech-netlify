import React from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
  CardMedia,
} from '@mui/material';

import { formatPrice, getStockBalance } from 'utility/helpers';

import { Counter } from '../Сounter';
import { TableBodyProps } from '../../types';
import styles from './MobileTableBody.module.scss';

const MobileTableBody: React.FC<TableBodyProps> = ({ order }) => {
  return (
    <TableBody className={styles.tableBody}>
      {order.map((item) => {
        const stockBalance = getStockBalance(item);
        const itemPrice = formatPrice(item.price);
        const countItemsPrice = formatPrice(item.quantity * item.price);

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
                <CardMedia
                  component={'img'}
                  height='150px'
                  src={item.images[0] || '/images/no-image.jpeg'}
                  alt='item'
                  className={styles.image}
                />
              </Box>
            </TableCell>
            <TableCell className={styles.itemInfo}>
              <Typography className={styles.itemTitle}>{item.title}</Typography>
              <Typography className={styles.itemPrice}>
                Цена: {itemPrice}&#8381;{' '}
              </Typography>
              <Counter item={item} stockBalance={stockBalance} />
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
