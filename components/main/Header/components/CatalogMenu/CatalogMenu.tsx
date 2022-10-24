import React, { FC, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import {
  selectCategoriesSearchRead,
  selectCategoriesTreeList,
} from 'store/reducers/catalog/selectors';
import { selectTransportStore } from 'store/reducers/transport/selectors';
import { TreeCategoryResponseData } from 'api/models/catalog';
import { useWindowSize } from 'hooks/useWindowSize';
import { useArrowNavigation } from 'hooks/useArrowNavigation';

import { HeaderContext } from '../HeaderContext';

import { CatalogMenuItem } from './components/CatalogMenuItem';
import { setFocus } from './helpers';
import { arrows, BOX_SHADOW } from './constants';
import { CatalogMenuProps } from './types';

import styles from './catalogMenu.module.scss';

const CatalogMenu: FC<CatalogMenuProps> = ({ handleClose }) => {
  const { isFullHeader } = useContext(HeaderContext);
  const { isTablet } = useWindowSize();

  const parentRef = useArrowNavigation({
    selectors: 'a',
  });

  const childrenRef = useArrowNavigation({
    selectors: 'a',
  });

  const [choosenCategory, setChoosenCategory] =
    useState<null | TreeCategoryResponseData>(null);
  const [choosenCategoryIndex, setChoosenCategoryIndex] = useState<number>();

  const { transportId } = useSelector(selectTransportStore);

  const currentSelector = transportId
    ? selectCategoriesSearchRead
    : selectCategoriesTreeList;

  const { data: categoriesTree } = useSelector(currentSelector);

  const resetCategory = () => setChoosenCategory(null);

  const showCatalogItem = (item: TreeCategoryResponseData, index: number) => {
    item.children ? setChoosenCategory(item) : resetCategory();
    setChoosenCategoryIndex(index);
  };

  const childrenBox = choosenCategory?.children
    ? choosenCategory.children
    : null;

  const setChildrenFocus = () =>
    setFocus({ ref: childrenRef, id: '#children' });
  const setParentsFocus = () =>
    setFocus({ ref: parentRef, id: '#parents', choosenCategoryIndex });

  const toggleFocus = (event: KeyboardEvent) => {
    const key = event.key;

    if (!arrows.includes(key)) {
      return;
    }

    const directionArrows = isFullHeader ? arrows : [...arrows].reverse();
    const [childrenKey, parentsKey] = directionArrows;

    if (key === childrenKey) {
      setChildrenFocus();
    }

    if (key === parentsKey) {
      setParentsFocus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', toggleFocus);

    return () => {
      document.removeEventListener('keydown', toggleFocus);
    };
  });

  return (
    <Container
      disableGutters
      className={styles.catalogContainer}
      sx={{
        flexDirection: isFullHeader ? 'row-reverse' : 'row',
        paddingLeft: isTablet ? 0 : isFullHeader ? '46px' : 0,
      }}
    >
      <Box className={styles.mainCategories} ref={parentRef}>
        {transportId && (
          <MenuItem className={styles.warningMessage}>
            Показаны категории для вашего авто, чтобы посмотреть все категории -
            очистите фильтр
          </MenuItem>
        )}
        <Box id='parents'>
          {categoriesTree.map((item: TreeCategoryResponseData, index) => (
            <CatalogMenuItem
              key={item.slug}
              item={item}
              parentSlug={item.slug}
              onMouseEnter={() => {
                showCatalogItem(item, index);
              }}
              handleClick={handleClose}
              isCategory
            />
          ))}
        </Box>
      </Box>

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
            ref={childrenRef}
          >
            {childrenBox.map((child) => (
              <Box
                key={child.slug}
                className={styles.childrenListItem}
                id='children'
              >
                <CatalogMenuItem
                  item={child}
                  className={styles.catalogItem_title}
                  handleClick={handleClose}
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
