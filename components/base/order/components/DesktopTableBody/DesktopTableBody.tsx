import React from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

import { formatPrice, getStockBalance } from 'utility/helpers';

import { Counter } from '../Сounter';
import { TableBodyProps } from '../../types';
import styles from './DesktopTableBody.module.scss';

const DesktopTableBody: React.FC<TableBodyProps> = ({ order }) => {
  return (
    <>
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
                <Box component='div' className={styles.imageBox}>
                  <CardMedia
                    component={'img'}
                    height='100px'
                    width='100px'
                    src={item.images[0] || '/images/no-image.jpeg'}
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
              <TableCell align='right'>
                <Counter item={item} stockBalance={stockBalance} />
              </TableCell>
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
