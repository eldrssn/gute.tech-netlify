import React, { FC } from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

import { Props } from './types';

export const ProductBreadcrumbs: FC<Props> = ({
  catalogTitle,
  productTitle,
}) => (
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
