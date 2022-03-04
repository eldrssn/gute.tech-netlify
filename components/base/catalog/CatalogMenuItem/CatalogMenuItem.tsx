import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const CatalogMenuItem = (props: string, index: number) => {
  return (
    <ListItem key={index} component='div' disablePadding>
      <ListItemButton>
        <ListItemText primary={props} />
      </ListItemButton>
    </ListItem>
  );
};

export default CatalogMenuItem;
