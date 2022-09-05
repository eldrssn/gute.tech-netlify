import React, { FC } from 'react';
import Popper from '@mui/material/Popper';
import classnames from 'classnames/bind';

import { useWindowSize } from 'hooks/useWindowSize';
import { CustomButton } from 'components/ui/CustomButton';

import { CatalogFilterButtonProps } from './types';
import styles from './catalogFilterButton.module.scss';

const cn = classnames.bind(styles);

const CatalogFilterButton: FC<CatalogFilterButtonProps> = ({
  anchorApplyButton,
  setAnchorApplyButton,
  handleDrawerToggle,
}) => {
  const { isMobile } = useWindowSize();

  const handleClose = () => {
    setAnchorApplyButton(null);

    if (handleDrawerToggle && isMobile) {
      handleDrawerToggle();
    }
  };

  const open = Boolean(anchorApplyButton);
  const id = open ? 'apply-button' : undefined;

  const isRanger = anchorApplyButton?.className.includes('ranger');
  const isSorting = anchorApplyButton?.className.includes('sortButtons');
  const isExpandedCheckbox =
    anchorApplyButton?.className.includes('button_small');

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorApplyButton}
      popperOptions={{
        placement: 'right',
        strategy: 'absolute',
      }}
      className={styles.popper}
    >
      <CustomButton
        onClick={handleClose}
        customStyles={cn(styles.button, {
          [styles.button_ranger]: isRanger || isExpandedCheckbox,
          [styles.button_sortings]: isSorting,
        })}
      >
        Показать
      </CustomButton>
    </Popper>
  );
};

export { CatalogFilterButton };
