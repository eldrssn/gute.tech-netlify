import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import styles from './styles.module.css';

const CatalogMenu: React.FC = () => {
  const catalogProperties = ['element 1', 'element 2', 'element 3', 'element4'];

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
