import React, { FC, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from '@mui/material/Container';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { selectCategoriesTreeList } from 'store/reducers/catalog/selectors';
import { TreeCategoryResponseData } from 'api/models/catalog';
import { clearTransportId } from 'store/reducers/transport/actions';

import { HeaderContext } from '../HeaderContext';

import { CatalogMenuItem } from './components/CatalogMenuItem';
import { BOX_SHADOW } from './constants';
import { CatalogMenuProps } from './types';

import styles from './catalogMenu.module.scss';

const CatalogMenu: FC<CatalogMenuProps> = ({ handleClose }) => {
  const dispatch = useDispatch();

  const { data: categoriesTree } = useSelector(selectCategoriesTreeList);
  const { isFullHeader, isTabletView } = useContext(HeaderContext);

  const isTabletShortView = !isFullHeader && !isTabletView;

  const [choosenCategory, setChoosenCategory] =
    useState<null | TreeCategoryResponseData>(null);

  const resetCategory = () => setChoosenCategory(null);

  const showCatalogItem = (item: TreeCategoryResponseData) => {
    item.children ? setChoosenCategory(item) : resetCategory();
  };

  const handleClickMenuItem = () => {
    handleClose();
    dispatch(clearTransportId());
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
            handleClick={handleClickMenuItem}
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
