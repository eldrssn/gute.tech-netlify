import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { PageNotFound } from 'components/main/PageNotFound';
import { ModalAddedItem } from 'components/main/ModalAddedItem';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { CustomButton } from 'components/ui/CustomButton';
import { Loader } from 'components/ui/Loader';
import { SubcategoriesList } from 'components/main/SubcategoriesList';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import { fetchCategoriesProductsRead } from 'store/reducers/catalog/actions';
import { selectCategoriesProductRead } from 'store/reducers/catalog/selectors';
import {
  addProductToCartAuthorized,
  addProductToCartUnAuthorized,
} from 'store/reducers/cart/actions';
import { fetchItemFromOrder } from 'store/reducers/order/actions';
import { formatPrice, makeAnArray } from 'utility/helpers';

import { ProductPrice } from './components/ProductPrice';
import { ProductQuantity } from './components/ProductQuantity';
import { ProductSpecial } from './components/ProductSpecial';
import { ProductImageGallery } from './components/ProductImageGallery';
import { ProductTabsDescription } from './components/ProductTabsDescription';
import { RecommendedProducts } from './components/RecommendedProducts';
import { getProductSlug } from './helpers';
import { PropertyNameByType } from './constants';
import { Properties } from './types';

import { selectTransportId } from 'store/reducers/transport/selectors';

import styles from './productPage.module.scss';

const ProductPage: FC = () => {
  const [isOpenModalAddedItem, setIsOpenModalAddedItem] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const transportId = useSelector(selectTransportId);

  const { categorySlug } = router.query;
  const categorySlugAnArray = makeAnArray(categorySlug);
  const сategorySlug = categorySlugAnArray[categorySlugAnArray.length - 2];
  const productSlug = getProductSlug(
    categorySlugAnArray[categorySlugAnArray.length - 1],
  );

  const { data: product, isLoading } = useSelector(selectCategoriesProductRead);
  const isAuthorized = useSelector(selectIsAuthorized);

  useEffect(() => {
    dispatch(
      fetchCategoriesProductsRead({
        productSlug: productSlug,
      }),
    );
  }, [сategorySlug, productSlug, transportId, dispatch]);

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
    faq,
    installation,
    manufacturer = '',
    vendor_code = '',
  } = product;

  const quantity =
    warehouses &&
    warehouses.reduce(
      (accumulator, warehouse) => accumulator + Number(warehouse.quantity),
      0,
    );

  const newProperties = [
    { title: PropertyNameByType[Properties.manufacturer], value: manufacturer },
    { title: PropertyNameByType[Properties.vendor_code], value: vendor_code },
    ...properties,
  ];

  const productInfo = {
    faq,
    installation,
    description,
    properties: newProperties,
  };

  const buyItNow = () => {
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

    if (isAuthorized) {
      dispatch(addProductToCartAuthorized({ product: slug, quantity: 1 }));
    }

    if (!isAuthorized) {
      dispatch(addProductToCartUnAuthorized({ product: slug, quantity: 1 }));
    }

    setIsOpenModalAddedItem(true);
  };

  const formattedPrice = formatPrice(price);

  return (
    <>
      {isOpenModalAddedItem && (
        <ModalAddedItem
          isOpen={isOpenModalAddedItem}
          setIsOpen={setIsOpenModalAddedItem}
          title={title}
        />
      )}

      <Box className={styles.mainContainer}>
        <SubcategoriesList />

        <Box
          sx={{
            width: { xs: '100%', md: '75%', lg: '80%' },
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
                  >
                    Купить сейчас
                  </CustomButton>
                  <CustomButton
                    customStyles={styles.buyButton}
                    onClick={addItemToBasket}
                  >
                    В корзину
                  </CustomButton>
                </Box>

                <ProductPrice>{formattedPrice || 9999}</ProductPrice>
              </Box>

              <ProductQuantity quantity={quantity || 0} />
              <ProductSpecial />
            </Container>
          </Box>

          <ProductTabsDescription {...productInfo} />

          <RecommendedProducts />
        </Box>
      </Box>
    </>
  );
};

export { ProductPage };
