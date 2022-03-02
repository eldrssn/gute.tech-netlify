import React from 'react';
import { Container, Box } from '@mui/material';
import { CustomButton } from 'ui/customButton';
// import useRouterQuery from '../../hooks/useRouterQuery/useRouterQuery';
// import { useRouter } from 'next/router';
import { productInfo } from 'mock/productInfo';
import { ProductPrice } from 'components/productPrice';
import { ProductStockCount } from 'components/productStockCount';
import { ProductSpecial } from 'components/productSpecial';
import { ProductTabs } from 'components/productTabs';
// import { useRouterQuery } from
import { ProductBreadcrumbs } from 'components/ProductBreadcrumbs';

const Product = () => {
  // const router = useRouter();
  // const routerQuery = useRouterQuery();

  // console.log(useRouterQuery);

  console.log(productInfo);

  return (
    <Container>
      <ProductBreadcrumbs
        catalogTitle={productInfo.catalogTitle}
        productTitle={productInfo.title}
      />

      {/* !TODO: сделать стили заголовку */}
      <h1>{productInfo.title}</h1>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <img
          width='433px'
          src='./images/mainProduct1.jpeg'
          alt={productInfo.title}
        />
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
    </Container>
  );
};

export default Product;
