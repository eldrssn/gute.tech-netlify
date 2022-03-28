import React from 'react';
import Image from 'next/image';
import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import { TTableBodyProps } from '../types';
import styles from './MobileTableBody.module.css';

const TableOrder: React.FC<TTableBodyProps> = ({
  cart,
  addCount,
  removeCount,
  removeItem,
}) => {
  return (
    <TableBody className={styles.tableBody}>
      {cart.map((item) => (
        <TableRow
          key={item.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell
            component='th'
            scope='row'
            className={styles.tableBodyName}
          >
            <Image
              height='150px'
              width='150px'
              src='/germanika/deflectors.jpg'
              alt='item'
            />
          </TableCell>
          <TableCell className={styles.itemInfo}>
            <Typography className={styles.itemTitle}>{item.name}</Typography>
            <Typography className={styles.itemPrice}>
              Цена: {item.price}&#8381;{' '}
            </Typography>
            <Box className={styles.itemCount}>
              <Button
                className={cn(styles.btnCount, styles.btnCountRemove)}
                onClick={() => removeCount(item)}
              >
                -
              </Button>
              {item.count}
              <Button
                className={cn(styles.btnCount, styles.btnCountAdd)}
                onClick={() => addCount(item)}
              >
                +
              </Button>
            </Box>
            <Typography className={styles.itemCost}>
              Стоимость: {item.count * item.price}&#8381;
            </Typography>
            <Button
              className={styles.btnDelete}
              onClick={() => removeItem(item)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableOrder;
