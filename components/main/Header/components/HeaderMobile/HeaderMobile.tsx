import React, { FC, useContext, useState } from 'react';

import Menu from '@mui/material/Menu';

import { CustomButton } from 'components/ui/CustomButton';

import { HeaderFilters } from '../HeaderFilters';
import { HeaderMobileNav } from '../HeaderMobileNav';
import { HeaderContext } from '../HeaderContext';

import styles from './headerMobile.module.scss';

const HeaderMobile: FC = () => {
  const { transportText } = useContext(HeaderContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <HeaderMobileNav />

      <CustomButton
        aria-controls={open}
        aria-haspopup='true'
        aria-expanded={open}
        onClick={handleClick}
        customStyles={styles.openFiltersButton}
      >
        {transportText ? `${transportText}` : 'Выберите транспорт'}
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
        anchorReference='none'
        open={open}
        onClose={handleClose}
        sx={{
          overflowY: 'auto !important',
          top: '121px !important',

          '& .MuiPopover-paper': {
            borderRadius: 0,
            margin: 0,
            maxWidth: '100vw',
            maxHeight: '350px',

            boxSizing: 'border-box',
            left: '0px !important',
            display: 'block',
          },
          '& .MuiMenu-list': {
            display: 'block',
            height: transportText ? '250px' : '350px',
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
        <HeaderFilters closePopupMobile={handleClose} />
      </Menu>
    </>
  );
};

export { HeaderMobile };
