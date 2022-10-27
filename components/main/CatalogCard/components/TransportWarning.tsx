import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import Tooltip from '@mui/material/Tooltip';

import { CONSULTATION_TEXT } from 'utility/utils/constants';

import styles from '../catalogCard.module.scss';

const TransportWarning = () => (
  <Tooltip
    className={styles.warningBox}
    title={CONSULTATION_TEXT}
    placement='bottom-end'
  >
    <ErrorIcon color='error' />
  </Tooltip>
);

export { TransportWarning };
