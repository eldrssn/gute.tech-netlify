import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { ModalAddedItem } from 'components/main/ModalAddedItem';
import { ProductListData } from 'api/models/catalog';
import { fetchItemFromCart } from 'store/reducers/cart/actions';

import { CustomButton } from 'components/ui/CustomButton';

import styles from './catalogCard.module.scss';
import {
  getLinkToProductPage,
  getLinkToTransportProductPage,
} from 'utility/helpers/linkmakers';
import { QueryUrl } from 'constants/variables';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { formatPrice } from 'utility/helpers';

const CatalogCard: React.FC<ProductListData> = ({
  image,
  price,
  slug,
  title,
}) => {
  const [isOpenModalAddedItem, setIsOpenModalAddedItem] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { getQueryOption } = useRouterQuery();
  const { categorySlug, subcategorySlug } = router.query;
  const transportQuery = getQueryOption(QueryUrl.TRANSPORT_QUERY);
  const transportId = getQueryOption(QueryUrl.TRANSPORT_ID);

  const addItemToBasket = () => {
    dispatch(fetchItemFromCart({ productSlug: slug }));
    setIsOpenModalAddedItem(true);
  };

  const handleClickToBasket = (event: React.MouseEvent<HTMLElement>) => {
    addItemToBasket();
    event.preventDefault();
  };

  const buyItNow = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(fetchItemFromCart({ productSlug: slug }));
    router.push('/cart');
    event.preventDefault();
  };

  const linkToProductPage = transportQuery
    ? getLinkToTransportProductPage({
        categorySlug,
        subcategorySlug,
        productSlug: slug,
        transportQuery,
        transportId,
      })
    : getLinkToProductPage({
        categorySlug,
        subcategorySlug,
        productSlug: slug,
      });

  const formattedPrice = formatPrice(price);

  return (
    <>
      <ModalAddedItem
        isOpen={isOpenModalAddedItem}
        setIsOpen={setIsOpenModalAddedItem}
        title={title}
      />
      <Card component='article' className={styles.cardContainer}>
        <Link href={linkToProductPage}>
          <a className={styles.cardLinkContainer}>
            <CardMedia
              component={'img'}
              height='250'
              image={image}
              alt={title}
              className={styles.cardImage}
            />

            <CardContent className={styles.cardInfo}>
              <Divider className={styles.cardDivider} />

              <Typography
                className={styles.cardTitle}
                gutterBottom
                component='h3'
              >
                {title}
              </Typography>

              <Box className={styles.cardBottom}>
                <div className={styles.cardBottom_price}>
                  <Typography className={styles.cardPrice}>
                    {formattedPrice}
                  </Typography>
                  <Typography className={styles.cardPrice} sx={{}}>
                    <i className={styles.icon_ruble} />
                  </Typography>
                </div>

                <CardActions className={styles.cardActions}>
                  <CustomButton
                    customStyles={styles.cardBuyButton}
                    onClick={buyItNow}
                  >
                    Купить
                  </CustomButton>

                  <CustomButton
                    customStyles={styles.cardAddToShoppingButton}
                    onClick={handleClickToBasket}
                  >
                    <Box className={styles.shoppingCart} />
                  </CustomButton>
                </CardActions>
              </Box>
            </CardContent>
          </a>
        </Link>
      </Card>
    </>
  );
};

export { CatalogCard };
