import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { ProductBreadcrumbsType } from './types';

export const ProductBreadcrumbs: React.FC<ProductBreadcrumbsType> = ({
  catalogTitle,
  productTitle,
}) => {
  return (
    <Breadcrumbs aria-label='breadcrumb'>
      <Link underline='hover' color='inherit' href='/'>
        Главная
      </Link>
      <Link underline='hover' color='inherit' href='/'>
        {catalogTitle}
      </Link>
      <Typography color='text.primary'>{productTitle}</Typography>
    </Breadcrumbs>
  );
};
