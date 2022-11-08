/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import Head from 'next/head';

import { fetchRegions, fetchBranches } from 'store/reducers/regions/actions';
import {
  fetchTransportReadCategories,
  fetchCategoriesList,
} from 'store/reducers/catalog/actions';
import {
  fetchCartAuthorized,
  fetchCartUnAuthorized,
} from 'store/reducers/cart/actions';
import { fetchCategoriesTreeList } from 'store/reducers/catalog/actions';
import { fetchShowcase } from 'store/reducers/showcase/actions';
import {
  fetchTransportInfo,
  setTransportId,
  setTransportYear,
} from 'store/reducers/transport/actions';
import { setCitySlug } from 'store/reducers/regions/actions';
import {
  fetchAccessToken,
  fetchUnauthorizationToken,
  setNotAuthorizationToken,
} from 'store/reducers/authentication/actions';
import {
  selectIsAuthorized,
  selectNotAuthorizedToken,
  selectLoadingAuthorized,
} from 'store/reducers/authentication/selectors';
import { selectStatus } from 'store/reducers/payment/selectors';
import { selectCartUpdated } from 'store/reducers/cart/selectors';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { selectSelectedCitySlug } from 'store/reducers/regions/selectors';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { useWindowSize } from 'hooks/useWindowSize';
import { getCookie } from 'utility/helpers';
import { QueryUrl, COOKIE_TTL } from 'constants/variables';
import { CookieKey } from 'constants/types';
import { selectShowcaseData } from 'store/reducers/showcase/selectors';
import { fetchProfile } from 'store/reducers/user/actions';
import { setAuthorizationWarning } from 'store/reducers/modal/actions';

const InitialLoader: React.FC = ({ children }) => {
  const { windowWidth } = useWindowSize();
  const { getQueryOption } = useRouterQuery();
  const dispatch = useDispatch();

  const [cookiesNotAuthorizedToken, setCookiesNotAuthorizedToken] =
    useCookies();
  const [cookiesTransportId, setCookieTransportId] = useCookies();
  const [cookiesCity, setCookiesCity] = useCookies();
  const [CookieTransportYear] = useCookies();

  const isLoadingApp = windowWidth;
  const transportIdQuery = getQueryOption(QueryUrl.TRANSPORT_ID);

  const notAuthorizedToken = useSelector(selectNotAuthorizedToken);
  const transportId = useSelector(selectTransportId);
  const isAuthorized = useSelector(selectIsAuthorized);
  const isAuthorizedLoading = useSelector(selectLoadingAuthorized);
  const selectedCitySlug = useSelector(selectSelectedCitySlug);
  const { favicon, metrics } = useSelector(selectShowcaseData);
  const cartIsUpdated = useSelector(selectCartUpdated);
  const { data: status } = useSelector(selectStatus);
  const metricId = metrics?.metric_id;

  useEffect(() => {
    dispatch(fetchShowcase());
    dispatch(fetchCategoriesList());
    dispatch(fetchCategoriesTreeList());
    dispatch(fetchRegions());
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    if (!metricId) {
      return;
    }

    window.ym(metricId, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      ecommerce: 'dataLayer',
      webvisor: true,
    });
  }, [metricId, dispatch]);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchProfile());
      return;
    }

    dispatch(setAuthorizationWarning(true));
  }, [isAuthorized]);

  useEffect(() => {
    if (transportId) {
      dispatch(fetchTransportReadCategories({ transportId }));
    }
  }, [dispatch, transportId]);

  useEffect(() => {
    const savedCity = cookiesCity.selectedCity;

    if (savedCity) {
      dispatch(setCitySlug(savedCity));
    }
  }, []);

  useEffect(() => {
    const date = new Date();
    date.setTime(date.getTime() + COOKIE_TTL);

    setCookiesCity(CookieKey.SELECTED_CITY, selectedCitySlug, {
      path: '/',
      expires: date,
    });
  }, [selectedCitySlug]);

  useEffect(() => {
    const savedTransportYear = CookieTransportYear.transportYear;

    if (savedTransportYear) {
      dispatch(setTransportYear(savedTransportYear));
    }
  }, []);

  useEffect(() => {
    const transportIdSaved = cookiesTransportId.transportId;
    const isTransportIdQuery =
      transportIdQuery && !Array.isArray(transportIdQuery);
    if (isTransportIdQuery) {
      dispatch(fetchTransportInfo({ transportId: transportIdQuery }));
      dispatch(setTransportId(transportIdQuery));
      return;
    }

    if (transportIdSaved) {
      dispatch(fetchTransportInfo({ transportId: transportIdSaved }));
      dispatch(setTransportId(transportIdSaved));
    }
  }, [transportIdQuery]);

  useEffect(() => {
    const date = new Date();
    date.setTime(date.getTime() + COOKIE_TTL);

    setCookieTransportId(CookieKey.TRANSPORT_ID, transportId, {
      path: '/',
      expires: date,
    });
  }, [transportId, setCookieTransportId]);

  useEffect(() => {
    const refresh = getCookie(CookieKey.REFRESH_TOKEN);
    if (refresh) {
      dispatch(fetchAccessToken({ refresh }));
    }
  }, []);

  useEffect(() => {
    if (cartIsUpdated || isAuthorizedLoading) {
      return;
    }

    if (isAuthorized) {
      dispatch(fetchCartAuthorized());
      return;
    }

    if (!notAuthorizedToken) {
      return;
    }

    dispatch(fetchCartUnAuthorized());
  }, [
    isAuthorized,
    notAuthorizedToken,
    cartIsUpdated,
    status,
    isAuthorizedLoading,
  ]);

  useEffect(() => {
    if (isAuthorized) {
      return;
    }

    const date = new Date();
    date.setTime(date.getTime() + COOKIE_TTL);

    setCookiesNotAuthorizedToken(
      CookieKey.NOT_AUTHORIZED_TOKEN,
      notAuthorizedToken,
      {
        path: '/',
        expires: date,
      },
    );

    if (notAuthorizedToken) {
      return;
    }

    const notAuthorizedTokenCookie =
      cookiesNotAuthorizedToken.notAuthorizedToken;

    if (notAuthorizedTokenCookie) {
      dispatch(setNotAuthorizationToken(notAuthorizedTokenCookie));
      return;
    }

    dispatch(fetchUnauthorizationToken());
  }, [isAuthorized, notAuthorizedToken]);

  if (!isLoadingApp) {
    return null;
  }

  return (
    <>
      <Head>
        <link rel='shortcut icon' href={favicon}></link>
      </Head>
      {children}
      <div id='modal-root'></div>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${metricId}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=''
          />
        </div>
      </noscript>
    </>
  );
};

export { InitialLoader };
