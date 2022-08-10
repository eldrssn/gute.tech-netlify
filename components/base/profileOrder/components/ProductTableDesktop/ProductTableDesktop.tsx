import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { TableBody, TableCell, TableRow, Typography } from '@mui/material';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { formatPrice } from 'utility/helpers';

import { getLink } from '../../helpers';
import { TableBodyProps } from '../../types';
import styles from './styles.module.scss';

const ProductTableDesktop: React.FC<TableBodyProps> = ({ products }) => {
  const router = useRouter();

  const { data: categoriesTreeListData } = useSelector(
    selectCategoriesTreeList,
  );

  const handleClickTitle = (link: string) => {
    if (!link) {
      return;
    }

    router.push(link);
  };

  return (
    <TableBody className={styles.tableBody}>
      {products.map((product) => {
        const itemPrice = formatPrice(product.price);
        const countItemsPrice = formatPrice(product.quantity * product.price);
        const link =
          product.product && getLink(product.product, categoriesTreeListData);

        return (
          <TableRow
            className={styles.tableRow}
            key={product.vendor_code}
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
                  onClick={() => handleClickTitle(link)}
                >
                  {product.title}
                </Typography>
                {product.is_service && (
                  <Typography className={styles.service}>*услуга</Typography>
                )}
              </Typography>
            </TableCell>
            <TableCell align='right'>{itemPrice}&#8381;</TableCell>
            <TableCell align='right'>{product.quantity}</TableCell>
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
