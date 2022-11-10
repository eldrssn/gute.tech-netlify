import React, { FC } from 'react';
import Box from '@mui/system/Box';

import { CustomControlsProps } from '../types';
import styles from '../productImageGallery.module.scss';

const CustomControls: FC<CustomControlsProps> = ({
  isFullscreen,
  title,
  closeFullscreen,
}) => {
  const displayCustomControls = isFullscreen ? 'block' : 'none';

  return (
    <>
      <Box
        component='span'
        sx={{ display: displayCustomControls }}
        className={styles.closeButton}
        onClick={closeFullscreen}
      />
      <Box
        className={styles.imageDescription}
        sx={{ display: displayCustomControls }}
      >
        {title}
      </Box>
    </>
  );
};

export { CustomControls };
