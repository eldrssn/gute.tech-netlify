import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { selectTransportId } from 'store/reducers/transport/selectors';
import { ModalAddedItem } from 'components/main/ModalAddedItem';
import { fetchItemFromCart } from 'store/reducers/cart/actions';
import { fetchItemFromOrder } from 'store/reducers/order/actions';

import { CustomButton } from 'components/ui/CustomButton';

import {
  getLinkToProductPage,
  getLinkToTransportProductPage,
} from 'utility/helpers/linkmakers';
import { formatPrice } from 'utility/helpers';

import { Title } from './components/TitleTooltip';

import { CatalogCardProps } from './types';
import styles from './catalogCard.module.scss';

const cn = classnames.bind(styles);

const CatalogCard: React.FC<CatalogCardProps> = ({
  image,
  price,
  slug,
  title,
  isSlider,
}) => {
  const [isOpenModalAddedItem, setIsOpenModalAddedItem] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { categorySlug, subcategorySlug } = router.query;
  const transportId = useSelector(selectTransportId);

  const addItemToBasket = () => {
    dispatch(fetchItemFromCart({ productSlug: slug }));
    setIsOpenModalAddedItem(true);
  };

  const handleClickToBasket = (event: React.MouseEvent<HTMLElement>) => {
    addItemToBasket();
    event.preventDefault();
  };

  const buyItNow = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(fetchItemFromOrder({ productSlug: slug }));
    router.push('/order');
    event.preventDefault();
  };

  const linkToProductPage = transportId
    ? getLinkToTransportProductPage({
        categorySlug,
        subcategorySlug,
        productSlug: slug,
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

      <Card
        component='article'
        className={cn(styles.cardContainer, {
          [styles.cardContainer_slider]: isSlider,
        })}
      >
        <Link href={linkToProductPage}>
          <a className={styles.cardLinkContainer}>
            <CardMedia
              component={'img'}
              height='250'
              src={image || '/images/no-image.jpeg'}
              alt={title}
              className={styles.cardImage}
            />

            <CardContent className={styles.cardInfo}>
              <Divider className={styles.cardDivider} />

              <Title>{title}</Title>

              <Box className={styles.cardBottom}>
                <div className={styles.cardBottom_price}>
                  <Typography className={styles.cardPrice}>
                    {formattedPrice}
                  </Typography>
                  <Typography className={styles.cardPrice}>
                    <i className={styles.icon_ruble} />
                  </Typography>
                </div>

                <CardActions className={styles.cardActions}>
                  {!isSlider && (
                    <CustomButton
                      customStyles={styles.cardBuyButton}
                      onClick={buyItNow}
                    >
                      Купить
                    </CustomButton>
                  )}

                  <CustomButton
                    customStyles={styles.cardAddToShoppingButton}
                    onClick={handleClickToBasket}
                  >
                    <i className={styles.shoppingIcon} />
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
