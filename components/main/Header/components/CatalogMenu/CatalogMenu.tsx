import React, { FC, useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import MenuItem from '@mui/material/MenuItem';
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
import { useWindowSize } from 'hooks/useWindowSize';

import { HeaderContext } from '../HeaderContext';

import { CatalogMenuItem } from './components/CatalogMenuItem';
import { BOX_SHADOW } from './constants';
import { CatalogMenuProps } from './types';

import styles from './catalogMenu.module.scss';

const CatalogMenu: FC<CatalogMenuProps> = ({ handleClose }) => {
  const { isFullHeader } = useContext(HeaderContext);
  const { isTablet } = useWindowSize();

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

  const childrenBox = choosenCategory?.children
    ? choosenCategory.children
    : null;

  return (
    <Container
      disableGutters
      className={styles.catalogContainer}
      sx={{
        flexDirection: isFullHeader ? 'row-reverse' : 'row',
        paddingLeft: isTablet ? 0 : isFullHeader ? '46px' : 0,
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
        <Box
          className={styles.childrenCategories}
          sx={{
            boxShadow: BOX_SHADOW,
          }}
        >
          <Box
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
          </Box>
        </Box>
      )}
    </Container>
  );
};

export { CatalogMenu };
