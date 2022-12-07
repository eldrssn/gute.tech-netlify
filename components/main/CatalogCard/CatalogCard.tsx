/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import Link from 'next/link';

import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { selectShowAuthorizationWarning } from 'store/reducers/modal/selectors';
import { selectMetrics } from 'store/reducers/showcase/selectors';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { selectCartUpdated } from 'store/reducers/cart/selectors';
import { ModalAddedItem } from 'components/main/ModalAddedItem';
import { ModalAddedItemUnAuthorized } from 'components/main/ModalAddedItemUnAuthorized';
import { Tittle } from 'components/ui/TittleTooltip/TittleTooltip';
import { fetchItemFromOrder } from 'store/reducers/order/actions';
import { CustomButton } from 'components/ui/CustomButton';
import {
  getLinkToProduct,
  getLinkToProductPage,
} from 'utility/helpers/linkmakers';
import { formatPrice } from 'utility/helpers';
import { sendMetrik } from 'utility/utils/metriks';

import { CatalogCardProps } from './types';
import styles from './catalogCard.module.scss';
import { TransportWarning } from './components/TransportWarning';
import { Rating } from './components/Rating';
import { BasketIcon } from 'components/ui/BasketIcon';
import { RubleIcon } from 'components/ui/RubleIcon';

const cn = classnames.bind(styles);

const CatalogCard: React.FC<CatalogCardProps> = ({
  image,
  price,
  slug,
  title,
  categories,
  is_linked_transport,
  isSlider,
  average_rating,
}) => {
  const [isOpenModalAddedItem, setIsOpenModalAddedItem] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const isAuthorized = useSelector(selectIsAuthorized);
  const isShowAuthorizationWarning = useSelector(
    selectShowAuthorizationWarning,
  );
  const metrics = useSelector(selectMetrics);
  const isCartUpdated = useSelector(selectCartUpdated);
  const transportId = useSelector(selectTransportId);

  const { asPath } = router;

  const handleClickToBasket = (event: React.MouseEvent<HTMLElement>) => {
    sendMetrik('reachGoal', metrics?.button_card_cart, metrics?.metric_id);
    setIsOpenModalAddedItem(true);
    event.preventDefault();
  };

  const buyItNow = (event: React.MouseEvent<HTMLButtonElement>) => {
    sendMetrik('reachGoal', metrics?.button_card_buy, metrics?.metric_id);
    dispatch(fetchItemFromOrder({ productSlug: slug }));
    router.push('/order');
    event.preventDefault();
  };

  const getLink = () =>
    isSlider
      ? getLinkToProduct({ categories: categories[0], productSlug: slug })
      : getLinkToProductPage({ asPath, productSlug: slug, transportId });

  const formattedPrice = formatPrice(price);
  const isAuthorizationWarging = !isAuthorized && isShowAuthorizationWarning;

  return (
    <>
      <Card
        component='article'
        className={cn(styles.cardContainer, {
          [styles.cardContainer_slider]: isSlider,
        })}
      >
        {!is_linked_transport && transportId && <TransportWarning />}

        {Number(average_rating) > 0 && (
          <Rating averageRating={average_rating} />
        )}

        <Link href={getLink()}>
          <a className={styles.cardLinkContainer}>
            <CardMedia
              component='img'
              src={image || '/images/no-image.jpeg'}
              alt={title}
              className={styles.cardImage}
              height='250px'
              loading='lazy'
            />
            <CardContent className={styles.cardInfo}>
              <Divider className={styles.cardDivider} />

              <Tittle className={styles.cardTitle} placement='top'>
                {title}
              </Tittle>

              <Box className={styles.cardBottom}>
                <div className={styles.cardBottom_price}>
                  <Typography className={styles.cardPrice}>
                    {formattedPrice}
                  </Typography>
                  <RubleIcon className={styles.icon_ruble} />
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
                    disabled={isCartUpdated}
                  >
                    <BasketIcon className={styles.shoppingIcon} />
                  </CustomButton>
                </CardActions>
              </Box>
            </CardContent>
          </a>
        </Link>
      </Card>

      {isAuthorizationWarging ? (
        <>
          {isOpenModalAddedItem && (
            <ModalAddedItemUnAuthorized
              isOpen={isOpenModalAddedItem}
              setIsOpen={setIsOpenModalAddedItem}
              slug={slug}
            />
          )}
        </>
      ) : (
        <>
          {isOpenModalAddedItem && (
            <ModalAddedItem
              isOpen={isOpenModalAddedItem}
              setIsOpen={setIsOpenModalAddedItem}
              title={title}
              slug={slug}
            />
          )}
        </>
      )}
    </>
  );
};

export { CatalogCard };
