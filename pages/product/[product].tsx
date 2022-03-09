import React, { FC } from 'react';
import { Container, Box } from '@mui/material';

import { CustomButton } from 'components/ui/CustomButton';

import { productInfo } from 'mock/productInfo';

import { ProductPrice } from 'components/base/product/ProductPrice';
import { ProductQuantity } from 'components/base/product/ProductQuantity';
import { ProductSpecial } from 'components/base/product/ProductSpecial';
import { ProductImageGallery } from 'components/base/product/ProductImageGallery';
import { ProductBreadcrumbs } from 'components/base/product/ProductBreadcrumbs';
import { RecommendedProducts } from 'components/base/product/RecommendedProducts';
import { ProductTabsDescription } from 'components/base/product/ProductTabsDescription';

const Product: FC = () => {
  return (
    <Container>
      <ProductBreadcrumbs
        catalogTitle={productInfo.catalogTitle}
        productTitle={productInfo.title}
      />

      {/* !TODO: сделать стили заголовку */}
      <h1>{productInfo.title}</h1>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <ProductImageGallery images={productInfo.images} />

        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <CustomButton>Купить в 1 клик</CustomButton>
            <CustomButton>В корзину</CustomButton>

            <ProductPrice>{productInfo.price}</ProductPrice>
          </Box>

          <ProductQuantity quantity={productInfo.quantity} />
          <ProductSpecial />
        </Container>
      </Box>

      <ProductTabsDescription productInfo={productInfo.info} />

      <RecommendedProducts />
    </Container>
  );
};

export default Product;
