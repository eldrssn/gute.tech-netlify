import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { getCrumbs } from 'hooks/useBreadcrumbs/helpers';

import { makeStringify } from '../helpers';

import styles from './catalogTitle.module.scss';

export const CatalogTitle: FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const stringifySlug = makeStringify(slug);

  const categoriesTree = useSelector(selectCategoriesTreeList);
  const names = getCrumbs(categoriesTree);

  return (
    <Box>
      <Typography component='h2' className={styles.title}>
        {names[stringifySlug]}
      </Typography>
    </Box>
  );
};
