import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { selectTransportId } from 'store/reducers/transport/selectors';
import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import {
  getLinkToCategoryFromCatalog,
  getLinkToParentCategory,
} from 'utility/helpers/linkmakers';

import { CategoriesProps } from './types';
import styles from './category.module.scss';
import Link from 'next/link';

const Category: FC<CategoriesProps> = ({ categorySlug }) => {
  const { data: categoriesTree } = useSelector(selectCategoriesTreeList);
  const transportId = useSelector(selectTransportId);

  const category = categoriesTree.find((item) => item.slug === categorySlug);
  const children = category?.children;
  const title = category?.title;

  const linkToCategory = getLinkToParentCategory({ categorySlug, transportId });

  return (
    <Container disableGutters>
      <Link href={linkToCategory}>
        <a>
          <h2 className={styles.header}>{title}</h2>
        </a>
      </Link>

      <Container
        disableGutters
        sx={{ columnCount: { sm: 1, md: 3, lg: 4 } }}
        className={styles.childrenList}
      >
        {children?.map((child) => {
          const linkToCatalog = getLinkToCategoryFromCatalog({
            categorySlug,
            subCategorySlug: child.slug,
            transportId,
          });

          return (
            <Box key={child.slug} className={styles.childrenListItem}>
              <Link href={linkToCatalog}>
                <a>
                  <Box className={styles.category_title}>{child.title}</Box>
                </a>
              </Link>

              <Divider light={true} />
            </Box>
          );
        })}
      </Container>
    </Container>
  );
};

export { Category };
