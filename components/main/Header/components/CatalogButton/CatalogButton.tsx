import React, { FC, useContext, useState } from 'react';
import classnames from 'classnames/bind';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { CustomButton } from 'components/ui/CustomButton';

import { HeaderContext } from '../HeaderContext';

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
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </>
  );
};
