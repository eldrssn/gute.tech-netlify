import React, { FC, useContext, useState } from 'react';
import classnames from 'classnames/bind';
import dynamic from 'next/dynamic';

import { CustomButton } from 'components/ui/CustomButton';

import { HeaderContext } from '../HeaderContext';

import styles from './catalogButton.module.scss';

const Popover = dynamic(() => import('@mui/material/Popover'));
const CatalogMenu = dynamic(() => import('../CatalogMenu'));

const cn = classnames.bind(styles);

const CatalogButton: FC = () => {
  const { isFullHeader } = useContext(HeaderContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const popoverLocation = isFullHeader ? 'right' : 'left';

  return (
    <>
      <CustomButton
        onClick={handleClick}
        customStyles={cn(styles.catalogButton, {
          [styles.catalogButton_hidden]: !isFullHeader,
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

      {anchorEl && (
        <Popover
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
              height: isFullHeader ? '70vh' : '85vh',
              paddingRight: '16px',
              backgroundColor: 'transparent',
              boxShadow: 'none',
              marginTop: isFullHeader ? '0' : '30px',
            },
          }}
          sx={{
            backgroundColor: '#00000031',
          }}
        >
          <CatalogMenu handleClose={handleClose} />
        </Popover>
      )}
    </>
  );
};

export { CatalogButton };
