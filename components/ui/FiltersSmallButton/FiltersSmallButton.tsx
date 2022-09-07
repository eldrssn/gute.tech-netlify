import React, { FC } from 'react';

import { FiltersButton } from '../FiltersButton';
import { FiltersButtonProps } from '../FiltersButton/types';
import styles from './filtersSmallButton.module.scss';

const FiltersSmallButton: FC<FiltersButtonProps> = ({ onClick, children }) => (
  <FiltersButton onClick={onClick} className={styles.button_small}>
    {children}
  </FiltersButton>
);

export { FiltersSmallButton };
