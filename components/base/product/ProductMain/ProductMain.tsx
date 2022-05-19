import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { selectCategoriesProductRead } from 'store/reducers/catalog/selectors';
import { fetchItemFromCart } from 'store/reducers/cart/actions';

import { ModalAddedItem } from 'components/main/ModalAddedItem';
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

import { productInitData } from './constants';
import styles from './productMain.module.scss';

const ProductMain: FC = () => {
  const [isOpenModalAddedItem, setIsOpenModalAddedItem] = useState(false);
  const dispatch = useDispatch();
  const { data: product, isLoading } = useSelector(selectCategoriesProductRead);

  const { title, price, images, description, properties, slug, warehouses } =
    product ? product : productInitData;

  const quantity =
    warehouses &&
    warehouses.reduce(
      (accumulator, warehouse) => accumulator + Number(warehouse.quantity),
      0,
    );

  const productInfo = { faq: '', installation: '', description, properties };

  const addItemToBasket = () => {
    if (!product) {
      return;
    }

    setIsOpenModalAddedItem(true);
    dispatch(fetchItemFromCart({ productSlug: slug }));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <ModalAddedItem
        isOpen={isOpenModalAddedItem}
        setIsOpen={setIsOpenModalAddedItem}
        title={title}
      />
      <Container className={styles.mainContainer} disableGutters>
        <Subcategories />

        <Container
          disableGutters
          // sx={{ width: '100%' }}
        >
          <NavigationBreadcrumbs lastTitle={title || 'Имя отсутствует'} />

          <h1 className={styles.title}>{title || 'Имя отсутствует'}</h1>

          <Container
            disableGutters
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
              sx={{ width: { xs: '100%', sm: '50%', md: '50%' } }}
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

              <ProductQuantity quantity={quantity || 0} />
              <ProductSpecial />
            </Container>
          </Container>

          <ProductTabsDescription {...productInfo} />

          {/* !TODO: добавить, когда появятся рекоммендованные товары на бэке */}
          {/* <RecommendedProducts /> */}
        </Container>
      </Container>
    </>
  );
};

export { ProductMain };
