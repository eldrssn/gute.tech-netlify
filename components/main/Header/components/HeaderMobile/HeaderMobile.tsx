import React, { FC } from 'react';

import Menu from '@mui/material/Menu';

import { CustomButton } from 'components/ui/CustomButton';

import { HeaderFilters } from '../HeaderFilters';
import { HeaderMobileDrawer } from '../HeaderMobileDrawer';

import styles from './headerMobile.module.css';

const HeaderMobile: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <HeaderMobileDrawer />

      <CustomButton
        aria-controls={open}
        aria-haspopup='true'
        aria-expanded={open}
        onClick={handleClick}
        customStyles={styles.openFiltersButton}
      >
        Выберите транспорт
      </CustomButton>

      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        id='mobile-filter'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: 0,
            margin: 0,
            maxWidth: '100vw',
            maxHeight: '350px',

            boxContent: 'border-box',
            left: '0px !important',
            display: 'block',
          },
          '& .MuiMenu-list': {
            display: 'block',
            height: '350px',
            overflow: 'visible',
            maxHeight: '350px',
            width: '100vw',
          },
          '& .MuiMenuItem-root': {
            padding: '0',
          },
          '& .MuiContainer-root': {
            padding: '7px',
            margin: '0 auto',
          },
          '& .MuiOutlinedInput-root': {
            marginTop: '10px',
            marginBottom: '10px',
          },
        }}
      >
        <HeaderFilters />
      </Menu>
    </>
  );
};

export { HeaderMobile };
