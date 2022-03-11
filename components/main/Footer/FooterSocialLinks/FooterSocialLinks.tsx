import React from 'react';
import { Box } from '@mui/system';
import CallRoundedIcon from '@mui/icons-material/CallRounded';

import { socialLinks } from './constance';
import styles from './footerSocialLinks.module.css';

export const FooterSocialLinks = () => (
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
        <li>
          <a className={styles.socialIcon} href={url} target='_blank'>
            <img src={icon} alt={title} height='30px' width='30px' />
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
