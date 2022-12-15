import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { PageNotFound } from 'components/main/PageNotFound';
import { ModalAddedItem } from 'components/main/ModalAddedItem';
import { ModalAddedItemUnAuthorized } from 'components/main/ModalAddedItemUnAuthorized';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { CustomButton } from 'components/ui/CustomButton';
import { Loader } from 'components/ui/Loader';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import { selectMetrics } from 'store/reducers/showcase/selectors';
import { selectShowAuthorizationWarning } from 'store/reducers/modal/selectors';
import {
  fetchCategoriesProductsRead,
  fetchProductAnaloguesRead,
} from 'store/reducers/product/actions';
import { selectCategoriesProductRead } from 'store/reducers/product/selectors';

import { fetchItemFromOrder } from 'store/reducers/order/actions';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { selectCartUpdated } from 'store/reducers/cart/selectors';
import { formatPrice, makeAnArray } from 'utility/helpers';
import { useWindowSize } from 'hooks/useWindowSize';
import { sendMetrik } from 'utility/utils/metriks';

import { ProductPrice } from './components/ProductPrice';
import { ProductQuantity } from './components/ProductQuantity';
import { ProductSpecial } from './components/ProductSpecial';
import { ProductImageGallery } from './components/ProductImageGallery';
import { ProductTabsDescription } from './components/ProductTabsDescription';
import { ProductInstallation } from './components/ProductInstallation';
import { CatalogCategories } from 'components/main/CatalogCategories';
import { getProductSlug } from './helpers';
import { PropertyNameByType } from './constants';
import { Properties } from './types';

import styles from './productPage.module.scss';

const RecommendedProducts = dynamic(
  () => import('./components/RecommendedProducts'),
);

const ProductPage: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isTablet } = useWindowSize();

  const [withInstallation, setWithInstallation] = useState(false);
  const [isOpenModalAddedItem, setIsOpenModalAddedItem] = useState(false);
  const [isToReview, setIsToReview] = useState(false);

  const isShowAuthorizationWarning = useSelector(
    selectShowAuthorizationWarning,
  );
  const { data: product, isLoading } = useSelector(selectCategoriesProductRead);
  const isAuthorized = useSelector(selectIsAuthorized);
  const metrics = useSelector(selectMetrics);
  const transportId = useSelector(selectTransportId);
  const isCartUpdated = useSelector(selectCartUpdated);

  const { categorySlug } = router.query;
  const categorySlugAnArray = makeAnArray(categorySlug);
  const сategorySlug = categorySlugAnArray[categorySlugAnArray.length - 2];
  const productSlug = getProductSlug(
    categorySlugAnArray[categorySlugAnArray.length - 1],
  );

  useEffect(() => {
    dispatch(
      fetchProductAnaloguesRead({
        productSlug,
      }),
    );
    dispatch(fetchCategoriesProductsRead({ productSlug }));
  }, [productSlug, сategorySlug, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <PageNotFound />;
  }

  const {
    title,
    price,
    images,
    description,
    properties = [],
    slug,
    warehouses,
    installation,
    is_linked_transport,
    manufacturer = '',
    vendor_code = '',
    average_rating,
  } = product;

  const newProperties = [
    { title: PropertyNameByType[Properties.manufacturer], value: manufacturer },
    { title: PropertyNameByType[Properties.vendor_code], value: vendor_code },
    ...properties,
  ];

  const productInfo = {
    installation,
    description,
    properties: newProperties,
    reviews: [],
    analogues: [],
  };

  const buyItNow = () => {
    sendMetrik('reachGoal', metrics?.button_product_buy, metrics?.metric_id);
    if (!product) {
      return;
    }

    dispatch(fetchItemFromOrder({ productSlug: slug }));
    router.push('/order');
  };

  const addItemToBasket = () => {
    if (!product) {
      return;
    }
    sendMetrik('reachGoal', metrics?.button_product_cart, metrics?.metric_id);

    setIsOpenModalAddedItem(true);
  };

  const isWarningMessage = Boolean(!is_linked_transport && transportId);
  const formattedPrice = formatPrice(price);
  const isAuthorizationWarging = !isAuthorized && isShowAuthorizationWarning;

  const handleClickToReviews = () => {
    setIsToReview(true);
  };

  return (
    <>
      {isAuthorizationWarging ? (
        <>
          {isOpenModalAddedItem && (
            <ModalAddedItemUnAuthorized
              withInstallation={withInstallation}
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
              withInstallation={withInstallation}
              isOpen={isOpenModalAddedItem}
              setIsOpen={setIsOpenModalAddedItem}
              title={title}
              slug={slug}
            />
          )}
        </>
      )}

      <Box className={styles.mainContainer}>
        {!isTablet && <CatalogCategories isProduct />}

        <Box
          sx={{
            width: { xs: '100%', lg: '74%' },
          }}
        >
          <NavigationBreadcrumbs lastTitle={title || 'Имя отсутствует'} />

          <h1 className={styles.title}>{title || 'Имя отсутствует'}</h1>

          <Box
            className={styles.productContainer}
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <ProductImageGallery
              images={images}
              title={title || 'Имя отсутствует'}
            />

            <Container
              sx={{
                width: { xs: '100%', sm: '50%', md: '50%' },
                paddingLeft: { xs: 0, sm: '16px' },
              }}
              className={styles.productInfoContainer}
            >
              <Box
                className={styles.productButtonsPriceWrapper}
                sx={{
                  flexDirection: { xs: 'column', lg: 'row' },
                }}
              >
                <Box
                  className={styles.buttonsContainer}
                  sx={{
                    flexDirection: {
                      xs: 'column',
                      md: 'row',
                    },
                    marginRight: { xs: 0, md: '5px', lg: '15px' },
                  }}
                >
                  <CustomButton
                    customStyles={styles.buyButton}
                    onClick={buyItNow}
                    disabled={withInstallation}
                  >
                    Купить сейчас
                  </CustomButton>
                  <CustomButton
                    customStyles={styles.buyButton}
                    onClick={addItemToBasket}
                    disabled={isCartUpdated}
                  >
                    В корзину
                  </CustomButton>
                </Box>

                <ProductPrice>{formattedPrice || 9999}</ProductPrice>
              </Box>

              <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
              >
                <ProductQuantity warehouses={warehouses} />
                <ProductInstallation
                  withInstallation={withInstallation}
                  setWithInstallation={setWithInstallation}
                />
              </Box>

              <ProductSpecial
                isWarningMessage={isWarningMessage}
                averageRating={Number(average_rating)}
                handleClickToReviews={handleClickToReviews}
              />
            </Container>
          </Box>

          <ProductTabsDescription
            productInfo={productInfo}
            isToReview={isToReview}
            setIsToReview={setIsToReview}
          />

          <RecommendedProducts />
        </Box>
      </Box>
    </>
  );
};

export { ProductPage };
