import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';

import { selectShowcaseData } from 'store/reducers/showcase/selectors';

import styles from './footerText.module.scss';
import Link from 'next/link';

const LINK = 'https://gute.tech/';

const FooterText: FC = () => {
  const { title, footerText } = useSelector(selectShowcaseData);

  return (
    <div>
      <Link href={LINK} passHref>
        <Box className={styles.logo} />
      </Link>
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
