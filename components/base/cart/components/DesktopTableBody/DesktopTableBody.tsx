import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CardMedia from '@mui/material/CardMedia';

import { selectTransportId } from 'store/reducers/transport/selectors';
import { selectSelectedCitySlug } from 'store/reducers/regions/selectors';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import {
  changeChecked,
  updateCartItemAuthorized,
  updateCartItemUnAuthorized,
} from 'store/reducers/cart/actions';
import { formatPrice } from 'utility/helpers';
import { getStockBalance } from 'utility/helpers';
import { getLinkToProduct } from 'utility/helpers/linkmakers';

import { DeleteItemButton } from '../DeleteItemButton';
import { Counter } from '../Сounter';
import { TTableBodyProps } from '../../types';

import styles from './DesktopTableBody.module.scss';

const DesktopTableBody: React.FC<TTableBodyProps> = ({ cart, isLoading }) => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector(selectIsAuthorized);
  const selectedCitySlug = useSelector(selectSelectedCitySlug);
  const transportId = useSelector(selectTransportId);

  const handleChandeInstallation = (
    slug: string,
    quantity: number,
    withInstallation: boolean,
  ) => {
    const items = [
      { product: slug, quantity, with_installation: withInstallation },
    ];

    if (isAuthorized) {
      dispatch(
        updateCartItemAuthorized({
          items,
          city: selectedCitySlug,
          transport: transportId,
        }),
      );
      return;
    }

    dispatch(
      updateCartItemUnAuthorized({
        items,
        city: selectedCitySlug,
        transport: transportId,
      }),
    );
  };

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
          cart.map((item) => {
            const stockBalance = getStockBalance(item);
            const itemPrice = formatPrice(item.price);
            const countItemsPrice = formatPrice(item.quantity * item.price);
            const categories = item.categories[0];
            const itemSlug = item.slug;
            const itemQuantity = item.quantity;
            const itemWithInstallation = item.withInstallation;
            const link = getLinkToProduct({
              categories: categories,
              productSlug: itemSlug,
            });

            return (
              <TableRow
                key={itemSlug}
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
                          onChange={() => handleChangeCheckBox(itemSlug)}
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
                    {item.installationPrice && (
                      <Box className={styles.installation}>
                        <FormControlLabel
                          className={styles.installationCheckbox}
                          label=''
                          disabled={isLoading}
                          control={
                            <Checkbox
                              checked={item.withInstallation}
                              onChange={() =>
                                handleChandeInstallation(
                                  itemSlug,
                                  itemQuantity,
                                  !itemWithInstallation,
                                )
                              }
                            />
                          }
                        />
                        <Typography className={styles.installationTitle}>
                          добавить установку: +{item.installationPrice}&#8381;
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
