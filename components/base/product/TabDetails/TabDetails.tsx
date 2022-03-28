import React, { FC } from 'react';
import { Box } from '@mui/material';

import { TabProps } from 'types/productTypes';

import styles from './tabDetails.module.css';

export const TabDetails: FC<TabProps> = ({ content }) => {
  if (!Array.isArray(content)) {
    return <p>{content}</p>;
  }

  return (
    <>
      {content.map(([label, details]) => (
        <Box className={styles.contentBox} key={label}>
          <span className={styles.contentLabel}>{label}</span>
          <span className={styles.spaceLine}></span>
          <span className={styles.contentValue}>{details}</span>
        </Box>
      ))}
    </>
  );
};
