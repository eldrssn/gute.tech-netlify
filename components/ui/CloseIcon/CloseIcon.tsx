import React, { FC } from 'react';

import { CloseIconProps } from './types';
import styles from './closeIcon.module.scss';

const CloseIcon: FC<CloseIconProps> = ({ fillColor = 'white' }) => (
  <svg
    aria-hidden='true'
    focusable='false'
    data-prefix='fas'
    data-icon='xmark'
    className={styles.closeIcon}
    role='img'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 320 512'
  >
    <path
      fill={fillColor}
      d='M 310.6 361.4 c 12.5 12.5 12.5 32.75 0 45.25 C 304.4 412.9 296.2 416 288 416 s -16.38 -3.125 -22.62 -9.375 L 160 301.3 L 54.63 406.6 C 48.38 412.9 40.19 416 32 416 S 15.63 412.9 9.375 406.6 c -12.5 -12.5 -12.5 -32.75 0 -45.25 l 105.4 -105.4 L 9.375 150.6 c -12.5 -12.5 -12.5 -32.75 0 -45.25 s 32.75 -12.5 45.25 0 L 160 210.8 l 105.4 -105.4 c 12.5 -12.5 32.75 -12.5 45.25 0 s 12.5 32.75 0 45.25 l -105.4 105.4 L 310.6 361.4 Z'
    ></path>
  </svg>
);

export { CloseIcon };
