import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CardMedia from '@mui/material/CardMedia';

import { changeChecked } from 'store/reducers/cart/actions';
import { formatPrice } from 'utility/helpers';
import { getStockBalance } from 'utility/helpers';
import { getLinkToProduct } from 'utility/helpers/linkmakers';

import { DeleteItemButton } from '../DeleteItemButton';
import { Counter } from '../Сounter';
import { TTableBodyProps } from '../../types';

import styles from './DesktopTableBody.module.scss';

const DesktopTableBody: React.FC<TTableBodyProps> = ({ cart, isLoading }) => {
  const dispatch = useDispatch();

  const handleChangeCheckBox = (slug: string) => {
    if (isLoading) {
      return;
    }

    dispatch(changeChecked(slug));
  };

  return (
    <>
      <TableBody className={styles.tableBody}>
        {cart.length > 0 ? (
          cart.map((item, index) => {
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
                    <Link href={link}>
                      <a>
                        <CardMedia
                          component={'img'}
                          height='100px'
                          width='100px'
                          src={item.images[0] || '/images/no-image.jpeg'}
                          alt='item'
                        />
                      </a>
                    </Link>
                  </Box>
                  <Box className={styles.itemInformationBox}>
                    <Typography className={styles.itemTitleBox}>
                      <Link href={link}>
                        <a>
                          <Typography className={styles.itemTitle}>
                            {item.title}
                          </Typography>
                        </a>
                      </Link>
                      <Typography className={styles.itemManufacturer}>
                        {item.manufacturer}
                      </Typography>
                    </Typography>
                    {index === 1 && (
                      <Box className={styles.installation}>
                        <Checkbox />
                        <Typography className={styles.installationTitle}>
                          Установка: +100&#8381;
                        </Typography>
                      </Box>
                    )}
                  </Box>
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
