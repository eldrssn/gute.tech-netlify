import React from 'react';

import List from '@mui/material/List';

import styles from './styles.module.css';
import { catalogProperties } from '../../mock/CatalogMenu';
import CatalogMenuItem from '../CatalogMenuItem';

const CatalogMenu: React.FC = () => {
  return (
    <List className={styles.catalog_list}>
      {catalogProperties.map(CatalogMenuItem)}
    </List>
  );
};

export default CatalogMenu;
