import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useBreadcrumbs } from 'hooks/useBreadcrumbs';
import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { SubcategoriesList } from 'components/main/CatalogCategories/components/SubcategoriesList';

import { sliceLastElement } from './helpers';
import { Props } from './types';
import styles from './catalogCategories.module.scss';

const CatalogCategories: FC<Props> = ({ isProduct }) => {
  const router = useRouter();

  const { data: categories } = useSelector(selectCategoriesTreeList);
  const transportId = useSelector(selectTransportId);

  const breadcrumbs = useBreadcrumbs({
    router,
    data: categories,
    transportId,
  });

  const treeCrumbs = isProduct ? sliceLastElement(breadcrumbs) : breadcrumbs;

  return (
    <Container
      component='article'
      className={styles.mainContainer}
      disableGutters
    >
      <p className={styles.title}>Категории</p>
      {treeCrumbs.map(({ href, text }, index) => (
        <Link href={href} key={href}>
          <a className={styles.category}>
            {treeCrumbs.length - 1 !== index && (
              <ArrowBackIosNewIcon color='primary' className={styles.arrow} />
            )}
            <p className={styles.categoryText}>{text}</p>
          </a>
        </Link>
      ))}
      <SubcategoriesList />
    </Container>
  );
};

export { CatalogCategories };
