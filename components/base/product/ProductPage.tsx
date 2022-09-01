import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { selectCategoriesProductRead } from 'store/reducers/catalog/selectors';
import { fetchItemFromCart } from 'store/reducers/cart/actions';
import { fetchItemFromOrder } from 'store/reducers/order/actions';
import { formatPrice, makeAnArray } from 'utility/helpers';

import { fetchCategoriesProductsRead } from 'store/reducers/catalog/actions';
import { PageNotFound } from 'components/main/PageNotFound';
import { ModalAddedItem } from 'components/main/ModalAddedItem';
import { NavigationBreadcrumbs } from 'components/main/NavigationBreadcrumbs';
import { CustomButton } from 'components/ui/CustomButton';
import { Loader } from 'components/ui/Loader';
import { SubcategoriesList } from 'components/main/SubcategoriesList';

import { RecommendedProducts } from './components/RecommendedProducts';
import { ProductPrice } from './components/ProductPrice';
import { ProductQuantity } from './components/ProductQuantity';
import { ProductSpecial } from './components/ProductSpecial';
import { ProductImageGallery } from './components/ProductImageGallery';
import { ProductTabsDescription } from './components/ProductTabsDescription';
import { getProductSlug } from './helpers';

import { selectTransportId } from 'store/reducers/transport/selectors';

import styles from './productPage.module.scss';

const ProductPage: FC = () => {
  const router = useRouter();
  const [isOpenModalAddedItem, setIsOpenModalAddedItem] = useState(false);
  const dispatch = useDispatch();

  const transportId = useSelector(selectTransportId);

  const { categorySlug } = router.query;
  const categorySlugAnArray = makeAnArray(categorySlug);
  const сategorySlug = categorySlugAnArray[categorySlugAnArray.length - 2];
  const productSlug = getProductSlug(
    categorySlugAnArray[categorySlugAnArray.length - 1],
  );

  const { data: product, isLoading } = useSelector(selectCategoriesProductRead);

  //TODO: добавить проверку на юрл после обновления метода на беке

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

    dispatch(fetchItemFromOrder({ productSlug: slug }));
    router.push('/order');
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
