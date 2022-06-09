import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { selectCategoriesProductRead } from 'store/reducers/catalog/selectors';
import { fetchItemFromCart } from 'store/reducers/cart/actions';
import { formatPrice } from 'utility/helpers';

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

import styles from './productMain.module.scss';

const ProductMain: FC = () => {
  const router = useRouter();
  const [isOpenModalAddedItem, setIsOpenModalAddedItem] = useState(false);
  const dispatch = useDispatch();
  const { data: product, isLoading } = useSelector(selectCategoriesProductRead);

  if (!product || isLoading) {
    return <Loader />;
  }

  const {
    title,
    price,
    images,
    description,
    properties,
    slug,
    warehouses,
    faq,
    installation,
  } = product;

  const quantity =
    warehouses &&
    warehouses.reduce(
      (accumulator, warehouse) => accumulator + Number(warehouse.quantity),
      0,
    );

  const productInfo = { faq, installation, description, properties };

  const buyItNow = () => {
    if (!product) {
      return;
    }

    dispatch(fetchItemFromCart({ productSlug: slug }));
    router.push('/cart');
  };

  const addItemToBasket = () => {
    if (!product) {
      return;
    }

    setIsOpenModalAddedItem(true);
    dispatch(fetchItemFromCart({ productSlug: slug }));
  };

  const formattedPrice = formatPrice(price);

  return (
    <>
      <ModalAddedItem
        isOpen={isOpenModalAddedItem}
        setIsOpen={setIsOpenModalAddedItem}
        title={title}
      />
      <Box className={styles.mainContainer}>
        <Subcategories />

        <Box
          sx={{
            maxWidth: { xs: '100%', md: '75%', lg: '80%' },
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

          {/* !TODO: добавить, когда появятся рекоммендованные товары на бэке */}
          {/* <RecommendedProducts /> */}
        </Box>
      </Box>
    </>
  );
};

export { ProductMain };
