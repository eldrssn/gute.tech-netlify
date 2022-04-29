import React, { FC } from 'react';
import { TailSpin } from 'react-loader-spinner';

import colors from 'styles/_export.module.scss';

import { LoaderProps } from './types';
import styles from './loader.module.scss';

export const Loader: FC<LoaderProps> = ({
  width = 50,
  height = 50,
  color = 'blue',
}) => (
  <TailSpin
    wrapperClass={styles.loader}
    height={height}
    width={width}
    color={colors[color]}
  />
);
