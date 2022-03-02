import React from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import { pages, menuItemNames, menuIcons } from './constants';
import { HeaderMenuProps } from './types';

const HeaderNavMenu: React.FC<HeaderMenuProps> = (props) => {
  return (
    <Toolbar disableGutters>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => {
          const Icon = menuIcons[page as keyof typeof menuIcons] || null;
          return (
            <MenuItem key={page}>
              <Icon />
              <Typography textAlign='center'>
                {props.isFullMenu &&
                  menuItemNames[page as keyof typeof menuItemNames]}
              </Typography>
            </MenuItem>
          );
        })}
      </Box>
    </Toolbar>
  );
};

export default HeaderNavMenu;
