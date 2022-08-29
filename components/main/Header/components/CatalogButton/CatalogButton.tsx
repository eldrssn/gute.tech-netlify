import React, { FC, useContext, useState } from 'react';
import classnames from 'classnames/bind';
import Popover from '@mui/material/Popover';

import { useWindowSize } from 'hooks/useWindowSize';
import { CustomButton } from 'components/ui/CustomButton';

import { HeaderContext } from '../HeaderContext';
import { CatalogMenu } from '../CatalogMenu';

import styles from './catalogButton.module.scss';

const cn = classnames.bind(styles);

const CatalogButton: FC = () => {
  const { isFullHeader } = useContext(HeaderContext);
  const { isTablet } = useWindowSize();

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
          [styles.catalogButton_tablet]: isTablet && isFullHeader,
          [styles.catalogButton_full]: isFullHeader,
        })}
      >
        <span className={styles.catalogTitle}>Каталог</span>
        <span
          className={cn(styles.catalogIcon, styles.catalogIconLines, {
            [styles.catalogIconLines_open]: open,
            [styles.catalogIconLines_full]: isFullHeader,
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
        PaperProps={{
          style: {
            borderRadius: 0,
            width: '100%',
            marginLeft: isFullHeader ? 0 : isTablet ? '-8px' : 0,
            maxWidth: isTablet ? 'calc(100% - 48px)' : '1200px',
          },
        }}
        sx={{
          backgroundColor: '#00000031',

          '&	.MuiPopover-paper': {
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

export { CatalogButton };
