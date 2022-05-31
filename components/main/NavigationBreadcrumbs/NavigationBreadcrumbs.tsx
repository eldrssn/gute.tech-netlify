import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Breadcrumbs from '@mui/material/Breadcrumbs';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';

import { Crumb } from './components/Crumb';
import { Query } from './types';

const NavigationBreadcrumbs: FC<Query> = ({ isQuery = false, lastTitle }) => {
  const router = useRouter();
  const { data: categories } = useSelector(selectCategoriesTreeList);

  const breadcrumbs = useBreadcrumbs({
    router,
    data: categories,
    lastTitle,
  });

  const breadcrumbsQuery = useBreadcrumbs({
    router,
    data: categories,
    isQuery,
  });

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      sx={{ paddingTop: { xs: '15px', md: 0 } }}
    >
      {isQuery
        ? breadcrumbsQuery.map((crumb, index) => (
            <Crumb {...crumb} key={index} />
          ))
        : breadcrumbs.map((crumb, index) => <Crumb {...crumb} key={index} />)}
    </Breadcrumbs>
  );
};

export { NavigationBreadcrumbs };
