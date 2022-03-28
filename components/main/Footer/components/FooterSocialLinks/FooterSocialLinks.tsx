import React, { FC } from 'react';
import { Box } from '@mui/system';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import Image from 'next/image';

import { socialLinks } from './constants';
import styles from './footerSocialLinks.module.scss';

export const FooterSocialLinks: FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'row', sm: 'column', md: 'row' },
    }}
  >
    <Box
      component='ul'
      sx={{
        margin: { xs: '0 20px 20px 0', sm: '0 auto', md: '0 20px' },
      }}
      className={styles.socialIconList}
    >
      {socialLinks.map(({ title, url, icon }) => (
        <li key={url}>
          <a
            className={styles.socialIcon}
            href={url}
            target='_blank'
            rel='noreferrer'
          >
            <Image src={icon} alt={title} height='30px' width='30px' />
          </a>
        </li>
      ))}
    </Box>

    <a href='tel:+74992832026' className={styles.footerPhone}>
      <CallRoundedIcon className={styles.footerPhoneIcon} />
      <span className={styles.footerPhoneNumber}>(499) 283-20-26</span>
    </a>
  </Box>
);
