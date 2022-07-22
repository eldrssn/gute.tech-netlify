import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Breadcrumbs from '@mui/material/Breadcrumbs';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { useBreadcrumbs } from 'hooks/useBreadcrumbs';

import { Crumb } from './components/Crumb';
import { Query } from './types';
import { checkLoadingCrumbs } from './helpers';

const NavigationBreadcrumbs: FC<Query> = ({ isQuery = false, lastTitle }) => {
  const router = useRouter();
  const { data: categories } = useSelector(selectCategoriesTreeList);
  const transportId = useSelector(selectTransportId);

  const breadcrumbs = useBreadcrumbs({
    router,
    data: categories,
    lastTitle,
    transportId,
  });

  const breadcrumbsQuery = useBreadcrumbs({
    router,
    data: categories,
    isQuery,
    transportId,
  });

  const currentCrumbs = isQuery ? breadcrumbsQuery : breadcrumbs;

  const isLoading = checkLoadingCrumbs(currentCrumbs);

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      sx={{
        paddingTop: { xs: '15px', md: 0 },
        '.MuiBreadcrumbs-separator': {
          marginLeft: '4px',
          marginRight: '4px',
        },
      }}
    >
      {!isLoading &&
        currentCrumbs.map((crumb, index) => <Crumb {...crumb} key={index} />)}
    </Breadcrumbs>
  );
};

export { NavigationBreadcrumbs };
