import React, { FC } from 'react';
import Drawer from '@mui/material/Drawer';

import { CatalogFilter } from '../CatalogFilter';
import { CatalogSort } from '../CatalogSort';
import { CatalogFilterDrawerProps } from './types';

import styles from './catalogFilterDrawer.module.scss';

const CatalogFilterDrawer: FC<CatalogFilterDrawerProps> = ({
  filtersRequest,
  openDrawer,
  handleDrawerToggle,
  setFiltersRequest,
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
        filtersRequest={filtersRequest}
        setFiltersRequest={setFiltersRequest}
        anchorApplyButton={anchorApplyButton}
        setAnchorApplyButton={setAnchorApplyButton}
        handleDrawerToggle={handleDrawerToggle}
      />
    </div>
  </Drawer>
);

export { CatalogFilterDrawer };
