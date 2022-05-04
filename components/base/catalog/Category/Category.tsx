import React, { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { TreeCategoryResponseData } from 'api/models/catalog';

import { CategoriesProps } from './types';
import styles from './category.module.scss';

export const Category: FC<CategoriesProps> = ({ slug }) => {
  const categoriesTree = useSelector(selectCategoriesTreeList);
  const category = categoriesTree.find((item) => item.slug === slug);

  const children = category?.children;
  const title = category?.title;

  const renderLastCategories = (child: TreeCategoryResponseData) =>
    child.children?.map((child) => (
      <Link
        href={`/catalog/${child.slug}?page=1&order=byPopularDown`}
        key={child.slug}
      >
        <a>
          <MenuItem className={styles.lastCategory_title}>
            {child.title}
          </MenuItem>
        </a>
      </Link>
    ));

  const renderSubcategories = (child: TreeCategoryResponseData) =>
    child.children?.map((child) => (
      <Fragment key={child.slug}>
        <Link
          href={`/catalog/${child.slug}?page=1&order=byPopularDown`}
          key={child.slug}
        >
          <a>
            <MenuItem className={styles.subcategory_title}>
              {child.title}
            </MenuItem>
          </a>
        </Link>

        {Boolean(child.children) && renderLastCategories(child)}
      </Fragment>
    ));

  return (
    <Container disableGutters>
      <Link href={`/catalog/${slug}?page=1&order=byPopularDown`}>
        <a>
          <h2 className={styles.header}>{title}</h2>
        </a>
      </Link>

      <Container
        disableGutters
        sx={{ columnCount: { sm: 1, md: 3, lg: 4 } }}
        className={styles.childrenList}
      >
        {children?.map((child) => (
          <Box key={child.slug} className={styles.childrenListItem}>
            <Link
              href={`/catalog/${child.slug}?page=1&order=byPopularDown`}
              key={child.slug}
            >
              <a>
                <MenuItem className={styles.category_title}>
                  {child.title}
                </MenuItem>
              </a>
            </Link>

            {Boolean(child.children) && renderSubcategories(child)}
            <Divider light={true} />
          </Box>
        ))}
      </Container>
    </Container>
  );
};
