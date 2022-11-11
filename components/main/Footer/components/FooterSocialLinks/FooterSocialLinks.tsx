import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import Link from 'next/link';
import Image from 'next/image';

import { PhoneIcon } from 'components/ui/PhoneIcon';

import { selectShowcaseData } from 'store/reducers/showcase/selectors';

import styles from './footerSocialLinks.module.scss';

const LINK = 'https://gute.tech/';

const FooterSocialLinks: FC = () => {
  const { socialLinkVk, phone } = useSelector(selectShowcaseData);

  const socialLinks = [
    {
      title: 'vk',
      url: socialLinkVk,
      icon: '/icons/vk-icon.png',
    },
  ];

  return (
    <Box className={styles.wrap}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'row', md: 'row' },
        }}
      >
        <Box
          component='ul'
          sx={{
            margin: { xs: '0 20px 20px 0', sm: '0 20px 20px 0', md: '0 20px' },
          }}
          className={styles.socialIconList}
        >
          {socialLinks.map(({ title, url, icon }) => {
            if (!url) {
              return null;
            }

            return (
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
            );
          })}
        </Box>

        <a href={`tel:${phone}`} className={styles.footerPhone}>
          <PhoneIcon className={styles.footerPhoneIcon} />
          <span className={styles.footerPhoneNumber}>{phone}</span>
        </a>
      </Box>
      <Link href={LINK} passHref>
        <a target='_blank' className={styles.logo} />
      </Link>
    </Box>
  );
};

export { FooterSocialLinks };
