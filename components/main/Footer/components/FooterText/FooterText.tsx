import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectShowcaseData } from 'store/reducers/showcase/selectors';

import styles from './footerText.module.scss';

const FooterText: FC = () => {
  const { title, footerText } = useSelector(selectShowcaseData);

  return (
    <div>
      <p className={styles.footerText}>{title}</p>
      <p className={styles.footerYear}>© 2022</p>
      <div
        className={styles.footerLawLink}
        dangerouslySetInnerHTML={{ __html: footerText }}
      />
    </div>
  );
};

export { FooterText };
