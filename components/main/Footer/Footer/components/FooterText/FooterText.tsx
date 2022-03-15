import React, { FC } from 'react';

import styles from './footerText.module.css';

export const FooterText: FC = () => (
  <div>
    <p className={styles.footerText}>
      Автомир
      <br />
      Oфициальный дилер Volkswagen в Москве
    </p>
    <p className={styles.footerYear}>© 2022</p>
    <a className={styles.footerLawLink} href='#'>
      Мы соответствуем 54ФЗ
    </a>
  </div>
);
