import React from 'react';
import Image from 'next/image';
import { TableBody, TableCell, TableRow, Typography, Box } from '@mui/material';

import { formatPrice } from 'utility/helpers';

import { TTableBodyProps } from '../../types';
import styles from './DesktopTableBody.module.scss';

const DesktopTableBody: React.FC<TTableBodyProps> = ({ order }) => {
  return (
    <>
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
                <Box component='div' className={styles.imageBox}>
                  <Image
                    height='100px'
                    width='100px'
                    src='/germanika/deflectors.jpg'
                    alt='item'
                  />
                </Box>
                <Typography className={styles.itemTitleBox}>
                  <Typography className={styles.itemTitle}>
                    {item.title}
                  </Typography>
                  <Typography className={styles.itemManufacturer}>
                    {item.manufacturer}
                  </Typography>
                </Typography>
              </TableCell>
              <TableCell align='right'>{itemPrice}&#8381;</TableCell>
              <TableCell align='right'>{item.count}</TableCell>
              <TableCell sx={{ position: 'relative' }} align='right'>
                {countItemsPrice}&#8381;
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};

export { DesktopTableBody };
