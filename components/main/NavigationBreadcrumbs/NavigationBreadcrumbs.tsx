import React, { FC } from 'react';
import { useRouter } from 'next/router';

import Breadcrumbs from '@mui/material/Breadcrumbs';

import { catalogData } from 'mock/catalogData';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';

import { Crumb } from './components/Crumb';

export const NavigationBreadcrumbs: FC = () => {
  const router = useRouter();
  const breadcrumbs = useBreadcrumbs(router, catalogData);

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {breadcrumbs.map((crumb, index) => (
        <Crumb {...crumb} key={index} last={index === breadcrumbs.length - 1} />
      ))}
    </Breadcrumbs>
  );
};
