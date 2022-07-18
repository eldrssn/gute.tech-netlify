import React from 'react';
import { TableBody, TableCell, TableRow, Typography } from '@mui/material';

import { formatPrice } from 'utility/helpers';

import { TableBodyProps } from '../../types';
import styles from './styles.module.scss';

const ProductTableMobile: React.FC<TableBodyProps> = ({ products }) => (
  <TableBody className={styles.tableBody}>
    {products.map((product) => {
      const itemPrice = formatPrice(product.price);
      const countItemsPrice = formatPrice(product.quantity * product.price);

      return (
        <TableRow
          className={styles.tableRow}
          key={product.vendor_code}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component='th' scope='row' className={styles.itemInfo}>
            <Typography className={styles.itemTitleBox}>
              <Typography className={styles.itemTitle}>
                {product.title}
              </Typography>
              {product.is_service && (
                <Typography className={styles.service}>*услуга</Typography>
              )}
            </Typography>
            <Typography className={styles.itemPrice}>
              Цена: {itemPrice}&#8381;{' '}
            </Typography>
            <Typography>Количество: {product.quantity}</Typography>
            <Typography className={styles.itemCost}>
              Стоимость: {countItemsPrice}&#8381;
            </Typography>
          </TableCell>
        </TableRow>
      );
    })}
  </TableBody>
);

export { ProductTableMobile };
