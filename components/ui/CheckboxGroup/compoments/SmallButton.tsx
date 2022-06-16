import React, { FC } from 'react';

import { Button } from './Button';
import { ButtonProps } from '../types';
import styles from '../checkboxGroup.module.scss';

const SmallButton: FC<ButtonProps> = ({ onClick, children }) => (
  <Button onClick={onClick} className={styles.button_small}>
    {children}
  </Button>
);

export { SmallButton };
