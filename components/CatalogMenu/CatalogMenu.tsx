import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import styles from './styles.module.css';
import { catalogProperties } from '../../mock/CatalogMenu';

const CatalogMenu: React.FC = () => {
  const renderElement = (props: any, index: number) => {
    return (
      <ListItem key={index} component='div' disablePadding>
        <ListItemButton>
          <ListItemText primary={props} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <List className={styles.catalog_list}>
      {catalogProperties.map(renderElement)}
    </List>
  );
};

export default CatalogMenu;
