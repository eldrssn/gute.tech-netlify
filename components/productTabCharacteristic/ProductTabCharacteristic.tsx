import React from 'react';
import { Box } from '@mui/material';
import { ProductContentTabType } from 'types/productTypes';

import styles from './productTabCharacteristic.module.css';

export const ProductTabCharacteristic: React.FC<ProductContentTabType> = ({
  content,
}) => {
  return Array.isArray(content) ? (
    <>
      {content.map((row) => (
        <Box className={styles.contentBox} key={row[0]}>
          <span className={styles.contentLabel}>{row[0]}</span>
          <span className={styles.spaceLine}></span>
          <span className={styles.contentValue}>{row[1]}</span>
        </Box>
      ))}
    </>
  ) : (
    <p>{content}</p>
  );
};
