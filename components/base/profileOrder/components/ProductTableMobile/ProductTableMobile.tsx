import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { TableBody, TableCell, TableRow, Typography } from '@mui/material';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { formatPrice, getLinkToProduct } from 'utility/helpers';

import { TableBodyProps } from '../../types';
import styles from './styles.module.scss';

const ProductTableMobile: React.FC<TableBodyProps> = ({ products }) => {
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
      {products.map((item) => {
        const itemPrice = formatPrice(item.price);
        const countItemsPrice = formatPrice(item.quantity * item.price);
        const link =
          item.product &&
          getLinkToProduct(
            item.product.slug,
            item.product.categories,
            categoriesTreeListData,
          );

        return (
          <TableRow
            className={styles.tableRow}
            key={item.vendor_code}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component='th' scope='row' className={styles.itemInfo}>
              <Typography className={styles.itemTitleBox}>
                <Typography
                  className={styles.itemTitle}
                  onClick={() => handleClickTitle(link)}
                >
                  {item.title}
                </Typography>
                {item.is_service && (
                  <Typography className={styles.service}>*услуга</Typography>
                )}
              </Typography>
              <Typography className={styles.itemPrice}>
                Цена: {itemPrice}&#8381;{' '}
              </Typography>
              <Typography>Количество: {item.quantity}</Typography>
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

export { ProductTableMobile };
