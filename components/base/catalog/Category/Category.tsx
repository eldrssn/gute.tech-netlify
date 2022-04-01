import React, { FC, Fragment } from 'react';
import Link from 'next/link';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import { catalogData } from 'mock/catalogData';
import { CatalogChild } from 'types/catalog';

import { CategoriesProps } from './types';
import styles from './category.module.scss';

export const Category: FC<CategoriesProps> = ({ url }) => {
  const category = catalogData.find((item) => item.url === url);

  const children = category?.children;
  const header = category?.title;

  const renderLastCategories = (child: CatalogChild) =>
    child.children?.map((child) => (
      <MenuItem className={styles.lastCategory_title} key={child.id}>
        {child.title}
      </MenuItem>
    ));

  const renderSubcategories = (child: CatalogChild) =>
    child.children?.map((child) => (
      <Fragment key={child.id}>
        <MenuItem className={styles.subcategory_title}>{child.title}</MenuItem>
        {child?.children.length > 0 && renderLastCategories(child)}
      </Fragment>
    ));

  return (
    <Container disableGutters>
      <Link href={`/catalog/${url}`}>
        <a>
          <h2 className={styles.header}>{header}</h2>
        </a>
      </Link>

      <Container
        disableGutters
        sx={{ columnCount: { sm: 1, md: 3, lg: 4 } }}
        className={styles.childrenList}
      >
        {children?.map((child) => (
          <Box key={child.id}>
            <MenuItem className={styles.category_title}>{child.title}</MenuItem>

            {child?.children.length > 0 && renderSubcategories(child)}
            <Divider light={true} />
          </Box>
        ))}
      </Container>
    </Container>
  );
};
