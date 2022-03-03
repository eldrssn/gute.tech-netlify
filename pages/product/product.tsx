import React from 'react';
import { Container, Box } from '@mui/material';

import { CustomButton } from 'ui/customButton';

import { productInfo } from 'mock/productInfo';

import { ProductPrice } from 'components/productPrice';
import { ProductStockCount } from 'components/productStockCount';
import { ProductSpecial } from 'components/productSpecial';
import { ProductTabs } from 'components/productTabs';
import { ProductImageGallery } from 'components/productImageGallery';
import { ProductBreadcrumbs } from 'components/productBreadcrumbs';
import { ProductsRecommended } from 'components/productsRecommended';

const Product = () => {
  return (
    <Container>
      <ProductBreadcrumbs
        catalogTitle={productInfo.catalogTitle}
        productTitle={productInfo.title}
      />
      {/* !TODO: сделать стили заголовку */}
      <h1>{productInfo.title}</h1>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <ProductImageGallery images={productInfo.images} />
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CustomButton>Купить в 1 клик</CustomButton>
            <CustomButton>В корзину</CustomButton>

            <ProductPrice>{productInfo.price}</ProductPrice>
          </Box>

          <ProductStockCount stockCount={productInfo.stockCount} />
          <ProductSpecial />
        </div>
      </Box>
      <ProductTabs productInfo={productInfo.info} />
      <ProductsRecommended />
    </Container>
  );
};

export default Product;
