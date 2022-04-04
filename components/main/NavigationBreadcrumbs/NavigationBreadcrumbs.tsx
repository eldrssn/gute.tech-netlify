import React, { FC } from 'react';
import { useRouter } from 'next/router';

import Breadcrumbs from '@mui/material/Breadcrumbs';

import { catalogData } from 'mock/catalogData';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';

import { Crumb } from './components/Crumb';
import { Query } from './types';

export const NavigationBreadcrumbs: FC<Query> = ({ isQuery = false }) => {
  const router = useRouter();

  const breadcrumbs = useBreadcrumbs(router, catalogData);
  const breadcrumbsQuery = useBreadcrumbs(router, catalogData, isQuery);

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {isQuery
        ? breadcrumbsQuery.map((crumb, index) => (
            <Crumb {...crumb} key={index} />
          ))
        : breadcrumbs.map((crumb, index) => <Crumb {...crumb} key={index} />)}
    </Breadcrumbs>
  );
};
