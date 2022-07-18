import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Container, Box } from '@mui/material';

import { AsideNavigation } from 'components/ui/AsideNavigation';

import { selectUserProfile } from 'store/reducers/user/selectors';
import {
  selectIsAuthorized,
  selectLoadingAuthorized,
} from 'store/reducers/authentication/selectors';

import { UserForm } from './components/UserForm';
import { UserActionButtons } from './components/UserActionButtons';

import styles from './profilePage.module.scss';

const ProfilePage = () => {
  const router = useRouter();

  const isAuthorized = useSelector(selectIsAuthorized);
  const loadingAuthorized = useSelector(selectLoadingAuthorized);
  const { isLoading: isLoadingUserProfile } = useSelector(selectUserProfile);

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
    <Container disableGutters className={styles.mainContainer}>
      <Box>
        <h1>Профиль</h1>

        <AsideNavigation />
      </Box>

      {!isLoadingUserProfile && (
        <Box className={styles.userInfo}>
          <UserForm />
          <UserActionButtons />
        </Box>
      )}
    </Container>
  );
};

export { ProfilePage };
