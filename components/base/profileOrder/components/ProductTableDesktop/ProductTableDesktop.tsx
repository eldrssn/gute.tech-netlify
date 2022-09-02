import React from 'react';

import { TableBody, TableCell, TableRow, Typography } from '@mui/material';

import { formatPrice } from 'utility/helpers';

import { TableBodyProps } from '../../types';
import styles from './styles.module.scss';

const ProductTableDesktop: React.FC<TableBodyProps> = ({ products }) => {
  //TODO: доделать ссылку на товар
  // const handleClickTitle = (link: string) => {
  //   if (!link) {
  //     return;
  //   }

  //   return;
  //   // router.push(link);
  // };

  return (
    <TableBody className={styles.tableBody}>
      {products.map((item) => {
        const itemPrice = formatPrice(item.price);
        const countItemsPrice = formatPrice(item.quantity * item.price);

        return (
          <TableRow
            className={styles.tableRow}
            key={item.vendor_code}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell
              component='th'
              scope='row'
              className={styles.tableBodyName}
            >
              <Typography className={styles.itemTitleBox}>
                <Typography
                  className={styles.itemTitle}
                  // onClick={() => handleClickTitle(link)}
                >
                  {item.title}
                </Typography>
                {item.is_service && (
                  <Typography className={styles.service}>*услуга</Typography>
                )}
              </Typography>
            </TableCell>
            <TableCell align='right'>{itemPrice}&#8381;</TableCell>
            <TableCell align='right'>{item.quantity}</TableCell>
            <TableCell sx={{ position: 'relative' }} align='right'>
              {countItemsPrice}&#8381;
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export { ProductTableDesktop };
