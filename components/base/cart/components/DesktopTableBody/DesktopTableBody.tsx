import React from 'react';
import Image from 'next/image';
import { TableBody, TableCell, TableRow, Typography, Box } from '@mui/material';

import { getStockBalance } from '../../helpers';
import { DeleteItemButton } from '../DeleteItemButton';
import { Counter } from '../Сounter';
import { TTableBodyProps } from '../../types';
import styles from './DesktopTableBody.module.scss';

const DesktopTableBody: React.FC<TTableBodyProps> = ({
  cart,
  addCount,
  removeCount,
  removeItem,
}) => {
  return (
    <>
      <TableBody className={styles.tableBody}>
        {cart.length ? (
          cart.map((item) => {
            const stockBalance = getStockBalance(item);

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
                <TableCell align='right'>{item.price}&#8381;</TableCell>
                <TableCell align='right'>
                  <Counter
                    item={item}
                    addCount={addCount}
                    removeCount={removeCount}
                    stockBalance={stockBalance}
                  />
                </TableCell>
                <TableCell sx={{ position: 'relative' }} align='right'>
                  {item.count * item.price}&#8381;
                  <DeleteItemButton item={item} removeItem={removeItem} />
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <Typography className={styles.warningMsg}>
            Добавьте товары в корзину
          </Typography>
        )}
      </TableBody>
    </>
  );
};

export { DesktopTableBody };
