import React, { FC } from 'react';
import Popper from '@mui/material/Popper';
import classnames from 'classnames/bind';

import { CustomButton } from 'components/ui/CustomButton';

import { CatalogFilterButtonProps } from './types';
import styles from './catalogFilterButton.module.scss';

const cn = classnames.bind(styles);

const CatalogFilterButton: FC<CatalogFilterButtonProps> = ({
  anchorApplyButton,
  setAnchorApplyButton,
  handleDrawerToggle,
}) => {
  const handleClose = () => {
    setAnchorApplyButton(null);
    handleDrawerToggle && handleDrawerToggle();
  };

  const open = Boolean(anchorApplyButton);
  const id = open ? 'apply-button' : undefined;

  const isRanger = anchorApplyButton?.className.includes('ranger');
  const isSorting = anchorApplyButton?.className.includes('sortButtons');

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorApplyButton}
      popperOptions={{
        placement: 'right',
        strategy: 'absolute',
      }}
      keepMounted={true}
      className={styles.popper}
    >
      <CustomButton
        onClick={handleClose}
        customStyles={cn(styles.button, {
          [styles.button_ranger]: isRanger,
          [styles.button_sortings]: isSorting,
        })}
      >
        Показать
      </CustomButton>
    </Popper>
  );
};

export { CatalogFilterButton };
