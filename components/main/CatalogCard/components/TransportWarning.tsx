import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import Tooltip from '@mui/material/Tooltip';

import { CONSULTATION_TEXT } from 'utility/utils/constants';

import styles from '../catalogCard.module.scss';

const TransportWarning = () => (
  <div className={styles.warningBox}>
    <p className={styles.consultationText_mobile}>{CONSULTATION_TEXT}</p>
    <Tooltip title={CONSULTATION_TEXT} placement='bottom-end'>
      <ErrorIcon sx={{ fontSize: '28px' }} color='error' />
    </Tooltip>
  </div>
);

export { TransportWarning };
