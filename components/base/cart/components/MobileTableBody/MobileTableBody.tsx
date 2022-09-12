import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  CardMedia,
} from '@mui/material';

import { changeChecked } from 'store/reducers/cart/actions';
import { formatPrice } from 'utility/helpers';
import { getStockBalance } from 'utility/helpers';
import { getLinkToProduct } from 'utility/helpers/linkmakers';

import { DeleteItemButton } from '../DeleteItemButton';
import { Counter } from '../Сounter';
import { TTableBodyProps } from '../../types';
import styles from './MobileTableBody.module.scss';

const MobileTableBody: React.FC<TTableBodyProps> = ({
  cart,
  addCount,
  removeCount,
  removeItem,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChangeCheckBox = (slug: string) => {
    dispatch(changeChecked(slug));
  };

  const handleClickTitle = (link: string) => {
    router.push(link);
  };

  return (
    <TableBody className={styles.tableBody}>
      {cart.map((item) => {
        const stockBalance = getStockBalance(item);
        const itemPrice = formatPrice(item.price);
        const countItemsPrice = formatPrice(item.count * item.price);
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
              <Box className={styles.imageBox}>
                <FormControlLabel
                  className={styles.checkbox}
                  label=''
                  control={
                    <Checkbox
                      checked={item.isChecked}
                      onChange={() => handleChangeCheckBox(item.slug)}
                    />
                  }
                />
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
              <Typography
                className={styles.itemTitle}
                onClick={() => handleClickTitle(link)}
              >
                {item.title}
              </Typography>
              <Typography className={styles.itemPrice}>
                Цена: {itemPrice}&#8381;{' '}
              </Typography>
              <Counter
                item={item}
                addCount={addCount}
                removeCount={removeCount}
                stockBalance={stockBalance}
              />
              <Typography className={styles.itemCost}>
                Стоимость: {countItemsPrice}&#8381;
              </Typography>
              <DeleteItemButton item={item} removeItem={removeItem} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export { MobileTableBody };
