import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  selectIsAuthorized,
  selectLoadingAuthorized,
} from 'store/reducers/authentication/selectors';

import { WithAuthorizeProps } from './types';

const WithAuthorize = ({
  ComponentForAuthorized,
  ComponentForUnauthorized,
}: WithAuthorizeProps) => {
  const router = useRouter();
  const isAuthorized = useSelector(selectIsAuthorized);
  const loadingAuthorized = useSelector(selectLoadingAuthorized);

  useEffect(() => {
    if (isAuthorized || loadingAuthorized) {
      return;
    }

    if (!ComponentForUnauthorized) {
      router.push('/');
    }
  }, [isAuthorized, router, loadingAuthorized, ComponentForUnauthorized]);

  if (ComponentForUnauthorized) {
    return isAuthorized ? ComponentForAuthorized : ComponentForUnauthorized;
  }

  return isAuthorized && ComponentForAuthorized;
};

export { WithAuthorize };
