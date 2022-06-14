import React, { FC, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { MenuItem } from '@mui/material';
import Container from '@mui/material/Container';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import {
  selectCategoriesSearchRead,
  selectCategoriesTreeList,
} from 'store/reducers/catalog/selectors';
import { selectTransportStore } from 'store/reducers/transport/selectors';
import { TreeCategoryResponseData } from 'api/models/catalog';

import { HeaderContext } from '../HeaderContext';

import { CatalogMenuItem } from './components/CatalogMenuItem';
import { BOX_SHADOW } from './constants';
import { CatalogMenuProps } from './types';

import styles from './catalogMenu.module.scss';

const CatalogMenu: FC<CatalogMenuProps> = ({ handleClose }) => {
  const { isFullHeader, isTabletView } = useContext(HeaderContext);
  const [choosenCategory, setChoosenCategory] =
    useState<null | TreeCategoryResponseData>(null);

  const { transportId } = useSelector(selectTransportStore);

  const currentSelector = transportId
    ? selectCategoriesSearchRead
    : selectCategoriesTreeList;

  const { data: categoriesTree } = useSelector(currentSelector);

  const resetCategory = () => setChoosenCategory(null);

  const showCatalogItem = (item: TreeCategoryResponseData) => {
    item.children ? setChoosenCategory(item) : resetCategory();
  };

  const handleClickMenuItem = () => {
    handleClose();
  };

  const isTabletShortView = !isFullHeader && !isTabletView;
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
        {transportId && (
          <MenuItem className={styles.warningMessage}>
            Показаны категории для вашего авто, чтобы посмотреть все категории -
            очистите фильтр
          </MenuItem>
        )}
        {categoriesTree.map((item: TreeCategoryResponseData) => (
          <CatalogMenuItem
            key={item.slug}
            item={item}
            parentSlug={item.slug}
            onMouseEnter={() => showCatalogItem(item)}
            handleClick={handleClickMenuItem}
            isCategory
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
                  handleClick={handleClickMenuItem}
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
