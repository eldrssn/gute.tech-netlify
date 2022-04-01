import React, { FC } from 'react';
import classnames from 'classnames/bind';
import Link from 'next/link';

import { CrumbProps } from './types';
import styles from './crumb.module.scss';

const cn = classnames.bind(styles);

export const Crumb: FC<CrumbProps> = ({ text, href, last = false }) => {
  if (last) {
    return <p className={cn(styles.crumb, styles.crumb_last)}>{text}</p>;
  }

  return (
    <Link href={href}>
      <a>
        <p className={styles.crumb}>{text}</p>
      </a>
    </Link>
  );
};
