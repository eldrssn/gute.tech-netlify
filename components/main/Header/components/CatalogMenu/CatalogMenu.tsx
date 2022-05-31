import React, { FC, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { TreeCategoryResponseData } from 'api/models/catalog';

import { HeaderContext } from '../HeaderContext';

import { CatalogMenuItem } from './components/CatalogMenuItem';
import { BOX_SHADOW } from './constants';
import { CatalogMenuProps } from './types';

import styles from './catalogMenu.module.scss';

const CatalogMenu: FC<CatalogMenuProps> = ({ handleClose }) => {
  const { data: categoriesTree } = useSelector(selectCategoriesTreeList);

  const [choosenCategory, setChoosenCategory] =
    useState<null | TreeCategoryResponseData>(null);

  const { isFullHeader, isTabletView } = useContext(HeaderContext);

  const isTabletShortView = !isFullHeader && !isTabletView;

  const resetCategory = () => setChoosenCategory(null);

  const showCatalogItem = (item: TreeCategoryResponseData) => {
    item.children ? setChoosenCategory(item) : resetCategory();
  };

  const childrenBox = choosenCategory?.children
    ? choosenCategory.children
    : null;

  return (
    <Container
      disableGutters
      className={styles.catalogContainer}
      sx={{
        marginTop: isFullHeader ? 0 : '8px',
        marginLeft: isTabletShortView ? '-120px' : 0,
        flexDirection: isFullHeader ? 'row-reverse' : 'row',
      }}
    >
      <MenuList className={styles.mainCategories}>
        {categoriesTree.map((item: TreeCategoryResponseData) => (
          <CatalogMenuItem
            key={item.slug}
            item={item}
            onMouseEnter={() => showCatalogItem(item)}
            handleClose={handleClose}
          />
        ))}
      </MenuList>

      {childrenBox && (
        <Container
          disableGutters
          className={styles.childrenCategories}
          sx={{
            boxShadow: BOX_SHADOW,
            marginLeft: isFullHeader ? '48px' : 0,
          }}
        >
          <Container
            disableGutters
            className={styles.childrenList}
            sx={{ columnCount: { md: 2, lg: 3 } }}
          >
            {childrenBox.map((child) => (
              <Box key={child.slug} className={styles.childrenListItem}>
                <CatalogMenuItem
                  item={child}
                  className={styles.catalogItem_title}
                  handleClose={handleClose}
                  parentSlug={choosenCategory?.slug}
                />
                <Divider />
              </Box>
            ))}
          </Container>
        </Container>
      )}
    </Container>
  );
};

export { CatalogMenu };
