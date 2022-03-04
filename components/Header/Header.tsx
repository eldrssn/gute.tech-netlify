import React, { useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

import HeaderFilters from '../HeaderFilters';
import HeaderNavMenu from '../HeaderNavMenu';

import styles from './styles.module.css';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isFullMenu, setIsFullMenu] = React.useState<boolean>(true);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  useEffect(() => {
    const onScroll = () => {
      if (document) {
        const { scrollTop } = document.documentElement;
        setIsFullMenu(() => !Boolean(scrollTop));
      }
    };

    if (window) {
      window.addEventListener('scroll', onScroll, false);
    }

    () => {
      window.removeEventListener('scroll', onScroll, false);
      return;
    };
  }, []);

  return (
    <AppBar
      style={{ background: '#2E3B55' }}
      sx={{ display: 'flex', flexWrap: 'wrap' }}
      position='fixed'
    >
      <Container
        sx={{ display: 'flex', justifyContent: 'right', flexWrap: 'wrap' }}
      >
        <Box sx={{ display: isFullMenu ? 'block' : 'none' }} component='div'>
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
          <MenuItem sx={{ display: isFullMenu ? 'block' : 'none' }}>
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
          <MenuItem sx={{ display: isFullMenu ? 'block' : 'none' }}>
            <Typography
              component='div'
              style={{ width: 150, whiteSpace: 'break-spaces' }}
            >
               Автокомпоненты Фольксваген Химки
            </Typography>
          </MenuItem>
        </Box>
        {isFullMenu && <HeaderNavMenu isFullMenu />}
      </Container>
      <Container>
        <HeaderFilters isFullMenu={isFullMenu} />
      </Container>
    </AppBar>
  );
};
export default Header;
