import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Container, Box } from '@mui/material';
import { AsideNavigation } from 'components/ui/AsideNavigation';

import {
  selectIsAuthorized,
  selectLoadingAuthorized,
} from 'store/reducers/authentication/selectors';

import styles from './profilePage.module.scss';
import { UserForm } from '../UserForm';
import { UserActionButtons } from '../UserActionButtons';

const ProfilePage = () => {
  const router = useRouter();

  const isAuthorized = useSelector(selectIsAuthorized);
  const loadingAuthorized = useSelector(selectLoadingAuthorized);

  useEffect(() => {
    if (isAuthorized || loadingAuthorized) {
      return;
    }

    router.push('/');
  }, [isAuthorized, router, loadingAuthorized]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <Container className={styles.mainContainer}>
      <Box>
        <h1>Профиль</h1>

        <AsideNavigation />
      </Box>

      <Box className={styles.userInfo}>
        <UserForm />
        <UserActionButtons />
      </Box>
    </Container>
  );
};

export { ProfilePage };
