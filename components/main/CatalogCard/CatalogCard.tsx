import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classnames from 'classnames/bind';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { selectShowAuthorizationWarning } from 'store/reducers/modal/selectors';
import { selectMetrics } from 'store/reducers/showcase/selectors';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import { selectTransportId } from 'store/reducers/transport/selectors';
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
import Image from 'next/image';

const cn = classnames.bind(styles);

const CatalogCard: React.FC<CatalogCardProps> = ({
  image,
  price,
  slug,
  title,
  categories,
  isSlider,
}) => {
  const [isOpenModalAddedItem, setIsOpenModalAddedItem] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const isAuthorized = useSelector(selectIsAuthorized);
  const isShowAuthorizationWarning = useSelector(
    selectShowAuthorizationWarning,
  );
  const metrics = useSelector(selectMetrics);

  const transportId = useSelector(selectTransportId);

  const { asPath } = router;

  const handleClickToBasket = (event: React.MouseEvent<HTMLElement>) => {
    sendMetrik('reachGoal', metrics.button_card_cart, metrics.metric_id);
    setIsOpenModalAddedItem(true);
    event.preventDefault();
  };

  const buyItNow = (event: React.MouseEvent<HTMLButtonElement>) => {
    sendMetrik('reachGoal', metrics.button_card_buy, metrics.metric_id);
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
        <Link href={getLink()}>
          <a className={styles.cardLinkContainer}>
            {/*  TODO: ОТТЕСТИТЬ */}
            {/* <CardMedia
              component={'img'}
              height='250'
              src={image || '/images/no-image.jpeg'}
              alt={title}
              className={styles.cardImage}
            /> */}
            <Box sx={{ height: '250px', width: '100%', position: 'relative' }}>
              <Image
                layout='fill'
                alt={title}
                src={image || '/images/no-image.jpeg'}
                blurDataURL='/images/no-image.jpeg'
                // height={250}
                // width={200}
                className={styles.cardImage}
              />
            </Box>
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
