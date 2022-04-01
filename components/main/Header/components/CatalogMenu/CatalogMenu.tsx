import React, { FC, Fragment, useContext, useState } from 'react';
import Link from 'next/link';

import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';

import { catalogData } from 'mock/catalogData';
import { CatalogChild } from 'types/catalog';

import { HeaderContext } from '../HeaderContext';

import { BOX_SHADOW } from './constants';
import { CatalogMenuProps } from './types';

import styles from './catalogMenu.module.scss';

export const CatalogMenu: FC<CatalogMenuProps> = ({ handleClose }) => {
  const [childrenBox, setChildrenBox] = useState<null | CatalogChild[]>(null);
  const { isFullHeader, isTabletView } = useContext(HeaderContext);

  const isTabletShortView = !isFullHeader && !isTabletView;

  const resetChildren = () => setChildrenBox(null);

  const showCatalogItem = (item: CatalogChild) => {
    item.children?.length > 0 ? setChildrenBox(item.children) : resetChildren();
  };

  const renderItemChildren = (child: CatalogChild) =>
    child.children?.map((child) => (
      <MenuItem className={styles.itemChildren_title} key={child.id}>
        {child.title}
      </MenuItem>
    ));

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
        {catalogData.map((item: CatalogChild) => (
          <Link href={`/catalog/${item.url}`} key={item.id}>
            <a>
              <MenuItem
                onMouseEnter={() => showCatalogItem(item)}
                onClick={handleClose}
              >
                {item.title}
              </MenuItem>
            </a>
          </Link>
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
              <Fragment key={child.id}>
                <MenuItem className={styles.catalogItem_title}>
                  {child.title}
                </MenuItem>

                {child?.children.length > 0 && renderItemChildren(child)}
                <Divider />
              </Fragment>
            ))}
          </Container>
        </Container>
      )}
    </Container>
  );
};
