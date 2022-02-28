import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

import HeaderFilters from '../HeaderFilters/HeaderFilters';
import styles from './styles.module.css';
import { pages, menuItemNames, menuIcons } from './constants';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      style={{ background: '#2E3B55' }}
      sx={{ display: 'flex', flexWrap: 'wrap' }}
      position='fixed'
    >
      <Container
        sx={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap' }}
      >
        <Box component='div'>
          <Typography>Выберите город</Typography>
        </Box>
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'right' }}>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            width: '100%',
            justifyContent: 'left',
          }}
        >
          <MenuItem>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <img className={styles.header_logo} src={'/logo-example.jpeg'} />
            </IconButton>
          </MenuItem>
          <MenuItem>
            <Typography
              component='div'
              style={{ width: 150, whiteSpace: 'break-spaces' }}
            >
               Автокомпоненты Фольксваген Химки
            </Typography>
          </MenuItem>
        </Box>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    {menuItemNames[page as keyof typeof menuItemNames]}
                  </Typography>
                  {/* {menuIcons[page as keyof typeof menuIcons]} */}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              const Icon = menuIcons[page as keyof typeof menuIcons] || null;
              return (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Icon />
                  <Typography textAlign='center'>
                    {menuItemNames[page as keyof typeof menuItemNames]}
                  </Typography>
                </MenuItem>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
      <Container>
        <HeaderFilters />
      </Container>
    </AppBar>
  );
};
export default Header;
