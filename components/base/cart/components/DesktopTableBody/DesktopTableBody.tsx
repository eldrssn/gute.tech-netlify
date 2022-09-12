import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  CardMedia,
} from '@mui/material';

import { changeChecked } from 'store/reducers/cart/actions';
import { formatPrice } from 'utility/helpers';
import { getStockBalance } from 'utility/helpers';
import { getLinkToProduct } from 'utility/helpers/linkmakers';

import { DeleteItemButton } from '../DeleteItemButton';
import { Counter } from '../Сounter';
import { TTableBodyProps } from '../../types';

import styles from './DesktopTableBody.module.scss';

const DesktopTableBody: React.FC<TTableBodyProps> = ({ cart, isLoading }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChangeCheckBox = (slug: string) => {
    if (isLoading) {
      return;
    }

    dispatch(changeChecked(slug));
  };

  const handleClickTitle = (link: string) => {
    router.push(link);
  };

  return (
    <>
      <TableBody className={styles.tableBody}>
        {cart.length > 0 ? (
          cart.map((item) => {
            const stockBalance = getStockBalance(item);
            const itemPrice = formatPrice(item.price);
            const countItemsPrice = formatPrice(item.quantity * item.price);
            const categories = item.categories[0];
            const link = getLinkToProduct({
              categories: categories,
              productSlug: item.slug,
            });

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
                    <FormControlLabel
                      className={styles.checkbox}
                      label=''
                      disabled={isLoading}
                      control={
                        <Checkbox
                          checked={item.isChecked}
                          onChange={() => handleChangeCheckBox(item.slug)}
                        />
                      }
                    />
                    <CardMedia
                      component={'img'}
                      height='100px'
                      width='100px'
                      src={item.images[0] || '/images/no-image.jpeg'}
                      alt='item'
                    />
                  </Box>
                  <Typography className={styles.itemTitleBox}>
                    <Typography
                      className={styles.itemTitle}
                      onClick={() => handleClickTitle(link)}
                    >
                      {item.title}
                    </Typography>
                    <Typography className={styles.itemManufacturer}>
                      {item.manufacturer}
                    </Typography>
                  </Typography>
                </TableCell>
                <TableCell align='right'>{itemPrice}&#8381;</TableCell>
                <TableCell align='right'>
                  <Counter
                    item={item}
                    stockBalance={stockBalance}
                    isLoading={isLoading}
                  />
                </TableCell>
                <TableCell sx={{ position: 'relative' }} align='right'>
                  {countItemsPrice}&#8381;
                  <DeleteItemButton item={item} isLoading={isLoading} />
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
