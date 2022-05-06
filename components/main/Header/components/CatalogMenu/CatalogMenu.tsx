import React, { FC, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { TreeCategoryResponseData } from 'api/models/catalog';

import { HeaderContext } from '../HeaderContext';

import { BOX_SHADOW } from './constants';
import { CatalogMenuProps, RenderItem } from './types';

import styles from './catalogMenu.module.scss';

const CatalogMenu: FC<CatalogMenuProps> = ({ handleClose }) => {
  const categoriesTree = useSelector(selectCategoriesTreeList);

  const [childrenBox, setChildrenBox] = useState<
    null | TreeCategoryResponseData[]
  >(null);

  const { isFullHeader, isTabletView } = useContext(HeaderContext);

  const isTabletShortView = !isFullHeader && !isTabletView;

  const resetChildren = () => setChildrenBox(null);

  const showCatalogItem = (item: TreeCategoryResponseData) => {
    item.children ? setChildrenBox(item.children) : resetChildren();
  };

  const renderItem = ({ item, className, onMouseEnter }: RenderItem) => (
    <Link
      href={`/catalog/${item.slug}?page=1&order=byPopularDown`}
      key={item.slug}
    >
      <a>
        <MenuItem
          className={className}
          key={item.slug}
          onClick={handleClose}
          onMouseEnter={onMouseEnter}
        >
          {item.title}
        </MenuItem>
      </a>
    </Link>
  );

  const renderItemChildren = (child: TreeCategoryResponseData) =>
    child.children?.map((child) =>
      renderItem({ item: child, className: styles.itemChildren_title }),
    );

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
        {categoriesTree.map((item: TreeCategoryResponseData) =>
          renderItem({ item, onMouseEnter: () => showCatalogItem(item) }),
        )}
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
                {renderItem({
                  item: child,
                  className: styles.catalogItem_title,
                })}

                {Boolean(child.children) && renderItemChildren(child)}
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
