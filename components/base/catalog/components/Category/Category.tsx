import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

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

const Category: FC<CategoriesProps> = ({ categorySlug }) => {
  const router = useRouter();
  const { data: categoriesTree } = useSelector(selectCategoriesTreeList);
  const transportId = useSelector(selectTransportId);

  const category = categoriesTree.find((item) => item.slug === categorySlug);
  const children = category?.children;
  const title = category?.title;

  const linkToCategory = getLinkToParentCategory({ categorySlug, transportId });

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <Container disableGutters>
      <a onClick={() => handleClick(linkToCategory)}>
        <h2 className={styles.header}>{title}</h2>
      </a>

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
              <a onClick={() => handleClick(linkToCatalog)}>
                <Box className={styles.category_title}>{child.title}</Box>
              </a>

              <Divider light={true} />
            </Box>
          );
        })}
      </Container>
    </Container>
  );
};

export { Category };
