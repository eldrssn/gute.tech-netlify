import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { productInitData, productMock } from 'mock/product';

import { selectCategoriesProductRead } from 'store/reducers/catalog/selectors';
import { fetchItemFromCart } from 'store/reducers/cart/actions';

import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { CustomButton } from 'components/ui/CustomButton';
import { Loader } from 'components/ui/Loader';

//  !TODO: добавить, когда появятся рекоммендованные товары на бэке
// import { RecommendedProducts } from 'components/base/product/RecommendedProducts';
import { ProductPrice } from '../ProductPrice';
import { ProductQuantity } from '../ProductQuantity';
import { ProductSpecial } from '../ProductSpecial';
import { ProductImageGallery } from '../ProductImageGallery';
import { ProductTabsDescription } from '../ProductTabsDescription';

import { Subcategories } from '../Subcategories';

import styles from './productMain.module.scss';

const ProductMain: FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(selectCategoriesProductRead);

  const { title, price, images, description, properties, slug } = data
    ? data
    : productInitData;

  const productInfo = { faq: '', installation: '', description, properties };

  const addItemToBasket = () => {
    if (!data) {
      return;
    }

    // !TODO: добавить сюда всплытие модалки
    dispatch(fetchItemFromCart({ productSlug: slug }));
  };

  const imagesGallary = images && images.length ? images : productMock.images;

  return isLoading ? (
    <Loader />
  ) : (
    <Container className={styles.mainContainer} disableGutters>
      <Subcategories />

      <Box>
        <NavigationBreadcrumbs lastTitle={title || 'Имя отсутствует'} />

        <h1 className={styles.title}>{title || 'Имя отсутствует'}</h1>

        <Box
          className={styles.productContainer}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <ProductImageGallery images={imagesGallary} />

          <Container className={styles.productInfoContainer}>
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
                }}
              >
                <CustomButton customStyles={styles.buyButton}>
                  Купить в 1 клик
                </CustomButton>
                <CustomButton
                  customStyles={styles.buyButton}
                  onClick={addItemToBasket}
                >
                  В корзину
                </CustomButton>
              </Box>

              <ProductPrice>{price || 9999}</ProductPrice>
            </Box>

            <ProductQuantity quantity={productMock.quantity} />
            <ProductSpecial />
          </Container>
        </Box>

        <ProductTabsDescription {...productInfo} />

        {/* !TODO: добавить, когда появятся рекоммендованные товары на бэке */}
        {/* <RecommendedProducts /> */}
      </Box>
    </Container>
  );
};

export { ProductMain };
