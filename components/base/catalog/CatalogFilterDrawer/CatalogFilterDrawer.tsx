import React, { FC } from 'react';
import { Drawer } from '@mui/material';

import { CatalogFilter } from '../CatalogFilter';
import { CatalogFilterDrawerProps } from './types';

import styles from './catalogFilterDrawer.module.scss';

export const CatalogFilterDrawer: FC<CatalogFilterDrawerProps> = ({
  openDrawer,
  handleDrawerToggle,
}) => (
  <Drawer
    transitionDuration={500}
    sx={{
      '& .MuiDrawer-paper': {
        width: '100vw',
        boxSizing: 'border-box',
        borderRight: 'none',
      },
    }}
    variant='persistent'
    anchor='left'
    open={openDrawer}
  >
    <div className={styles.drawerContainer}>
      <span className={styles.closeButton} onClick={handleDrawerToggle} />
      <CatalogFilter />
    </div>
  </Drawer>
);
