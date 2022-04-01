import React, { FC, useContext, useState } from 'react';
import classnames from 'classnames/bind';

import Popover from '@mui/material/Popover';

import { CustomButton } from 'components/ui/CustomButton';

import { HeaderContext } from '../HeaderContext';
import { CatalogMenu } from '../CatalogMenu';

import styles from './catalogButton.module.css';

const cn = classnames.bind(styles);

export const CatalogButton: FC = () => {
  const { isFullHeader, isTabletView } = useContext(HeaderContext);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const popoverLocation = isFullHeader ? 'right' : 'left';

  return (
    <>
      <CustomButton
        aria-describedby={id}
        onClick={handleClick}
        customStyles={cn(styles.catalogButton, {
          [styles.catalogButton_hidden]: !isFullHeader,
          [styles.catalogButton_tablet]: isTabletView && isFullHeader,
        })}
      >
        <span className={styles.catalogTitle}>Каталог</span>
        <span
          className={cn(styles.catalogIcon, styles.catalogIconLines, {
            [styles.catalogIconLines_open]: open,
          })}
        />
      </CustomButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: popoverLocation,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: popoverLocation,
        }}
        sx={{
          backgroundColor: '#00000031',

          '&	.MuiPopover-paper': {
            overflowY: 'inherit',
            overflowX: 'inherit',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <CatalogMenu handleClose={handleClose} />
      </Popover>
    </>
  );
};
