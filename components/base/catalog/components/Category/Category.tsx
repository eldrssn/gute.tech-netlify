import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { clearTransportId } from 'store/reducers/transport/actions';
import {
  getLinkToCatalog,
  getLinkToCategory,
} from 'utility/helpers/linkmakers';
import { addItemToLocaleStorage } from 'utility/helpers';
import { isFromWidgets, IS_FROM_WIDGETS } from 'utility/utils/constants';

import { CategoriesProps } from './types';
import styles from './category.module.scss';

const Category: FC<CategoriesProps> = ({ categorySlug }) => {
  const dispatch = useDispatch();
  const { data: categoriesTree } = useSelector(selectCategoriesTreeList);
  const category = categoriesTree.find((item) => item.slug === categorySlug);

  const children = category?.children;
  const title = category?.title;

  const linkToCategory = getLinkToCategory(categorySlug);

  useEffect(() => {
    addItemToLocaleStorage({
      slug: IS_FROM_WIDGETS,
      title: isFromWidgets.FALSE,
    });

    dispatch(clearTransportId());
  }, [dispatch]);

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
          const linkToCatalog = getLinkToCatalog({
            categorySlug,
            subcategorySlug: child.slug,
          });

          return (
            <Box key={child.slug} className={styles.childrenListItem}>
              <Link href={linkToCatalog} key={child.slug}>
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