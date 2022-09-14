import React, { FC } from 'react';
import { Drawer } from '@mui/material';

import { CatalogFilter } from '../CatalogFilter';
import { CatalogFilterDrawerProps } from './types';

import styles from './catalogFilterDrawer.module.scss';
import { CatalogSort } from '../CatalogSort';

const CatalogFilterDrawer: FC<CatalogFilterDrawerProps> = ({
  filterRequest,
  openDrawer,
  handleDrawerToggle,
  setFilterRequest,
  anchorApplyButton,
  setAnchorApplyButton,
  setSorting,
}) => (
  <Drawer
    transitionDuration={500}
    sx={{
      '& .MuiDrawer-paper': {
        width: '100vw',
        boxSizing: 'border-box',
        borderRight: 'none',
        zIndex: 1101,
      },
    }}
    variant='persistent'
    anchor='left'
    open={openDrawer}
  >
    <div className={styles.drawerContainer}>
      <span className={styles.closeButton} onClick={handleDrawerToggle} />
      <CatalogSort
        setSorting={setSorting}
        setAnchorApplyButton={setAnchorApplyButton}
      />
      <CatalogFilter
        filterRequest={filterRequest}
        setFilterRequest={setFilterRequest}
        anchorApplyButton={anchorApplyButton}
        setAnchorApplyButton={setAnchorApplyButton}
        handleDrawerToggle={handleDrawerToggle}
      />
    </div>
  </Drawer>
);

export { CatalogFilterDrawer };
