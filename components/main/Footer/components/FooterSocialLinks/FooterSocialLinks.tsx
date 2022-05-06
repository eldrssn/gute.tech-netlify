import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import Image from 'next/image';

import { selectShowcaseData } from 'store/reducers/showcase/selectors';

import styles from './footerSocialLinks.module.scss';

const FooterSocialLinks: FC = () => {
  const { socialLinkVk, socialLinkFacebook, socialLinkInstagram, phone } =
    useSelector(selectShowcaseData);

  const socialLinks = [
    {
      title: 'facebook',
      url: socialLinkFacebook,
      icon: '/icons/fb-icon.png',
    },
    {
      title: 'vk',
      url: socialLinkVk,
      icon: '/icons/vk-icon.png',
    },
    {
      title: 'instagram',
      url: socialLinkInstagram,
      icon: '/icons/insta-icon.png',
    },
  ];

  return (
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

      <a href='tel:+74992832026' className={styles.footerPhone}>
        <CallRoundedIcon className={styles.footerPhoneIcon} />
        <span className={styles.footerPhoneNumber}>{phone}</span>
      </a>
    </Box>
  );
};

export { FooterSocialLinks };
