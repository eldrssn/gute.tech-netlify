import React, { FC } from 'react';
import { Container, Box } from '@mui/material';

import { CustomButton } from 'ui/CustomButton';

import { productInfo } from 'mock/productInfo';

import { ProductPrice } from 'components/ProductPrice';
import { ProductStockCount } from 'components/ProductStockCount';
import { ProductSpecial } from 'components/ProductSpecial';
import { ProductImageGallery } from 'components/ProductImageGallery';
import { ProductBreadcrumbs } from 'components/ProductBreadcrumbs';
import { RecommendedProducts } from 'components/RecommendedProducts';
import { ProductTabsDescription } from 'components/ProductTabsDescription';

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

          <ProductStockCount stockCount={productInfo.stockCount} />
          <ProductSpecial />
        </Container>
      </Box>

      <ProductTabsDescription productInfo={productInfo.info} />

      <RecommendedProducts />
    </Container>
  );
};

export default Product;
