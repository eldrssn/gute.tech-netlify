import React, { FC } from 'react';
import Box from '@mui/material/Box';

import { Content, Property, TabProps } from 'types/product';

import styles from './tabDetails.module.scss';

const TabDetails: FC<TabProps> = ({ content }) => {
  if (content?.length === 0) {
    return <p>Нет данных</p>;
  }

  const isProperties = (value: Content | Property[]): value is Property[] => {
    return true;
  };

  if (!Array.isArray(content) || !isProperties(content)) {
    return <p>{content}</p>;
  }

  return (
    <>
      {content.map(({ title, value }) => (
        <Box className={styles.contentBox} key={title}>
          <span className={styles.contentLabel}>{title}</span>
          <span className={styles.spaceLine}></span>
          <span className={styles.contentValue}>{value}</span>
        </Box>
      ))}
    </>
  );
};

export { TabDetails };
