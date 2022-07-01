/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import { fetchRegions } from 'store/reducers/regions/actions';
import { fetchTransportReadCategories } from 'store/reducers/catalog/actions';
import { fetchItemFromCart } from 'store/reducers/cart/actions';
import { fetchCategoriesTreeList } from 'store/reducers/catalog/actions';
import { fetchShowcase } from 'store/reducers/showcase/actions';
import { fetchProfile } from 'store/reducers/user/actions';
import {
  fetchTransportInfo,
  setTransportId,
} from 'store/reducers/transport/actions';
import { fetchAccessToken } from 'store/reducers/authentication/actions';
import { selectCart } from 'store/reducers/cart/selectors';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { useWindowSize } from 'hooks/useWindowSize';
import {
  getSlugsCartItemsFromString,
  getSlugsCartItemsFromCart,
  getCookie,
} from 'utility/helpers';
import { QueryUrl } from 'constants/variables';
import { CookieKey } from 'constants/types';

const InitialLoader: React.FC = ({ children }) => {
  const { windowWidth } = useWindowSize();
  const { getQueryOption } = useRouterQuery();
  const dispatch = useDispatch();

  const [cookiesTransportId, setCookieTransportId] = useCookies([
    CookieKey.TRANSPORT_ID,
  ]);
  const [cookiesCartItems, setCookieCartItems] = useCookies([
    CookieKey.CARTITEMS,
  ]);

  const isLoadingApp = windowWidth;
  const transportIdQuery = getQueryOption(QueryUrl.TRANSPORT_ID);

  const cart = useSelector(selectCart);
  const transportId = useSelector(selectTransportId);
  const isAuthorized = useSelector(selectIsAuthorized);

  useEffect(() => {
    dispatch(fetchShowcase());
    dispatch(fetchCategoriesTreeList());
    dispatch(fetchRegions());
  }, [dispatch]);

  useEffect(() => {
    if (transportId) {
      dispatch(fetchTransportReadCategories({ transportId }));
    }
  }, [dispatch, transportId]);

  useEffect(() => {
    const cartSaved = cookiesCartItems.cartItems;

    if (cartSaved) {
      getSlugsCartItemsFromString(cartSaved).forEach((cartItem) => {
        dispatch(
          fetchItemFromCart({
            productSlug: cartItem.slug,
            count: cartItem.count,
            ordinalId: cartItem.ordinalId,
          }),
        );
      });
    }
  }, [cookiesCartItems]);

  useEffect(() => {
    const transportIdSaved = cookiesTransportId.transportId;
    const isTransportIdQuery =
      transportIdQuery && !Array.isArray(transportIdQuery);
    if (isTransportIdQuery) {
      dispatch(fetchTransportInfo({ transportId: transportIdQuery }));
      dispatch(setTransportId(transportIdQuery));
    }

    if (!isTransportIdQuery && transportIdSaved) {
      dispatch(fetchTransportInfo({ transportId: transportIdSaved }));
      dispatch(setTransportId(transportIdSaved));
    }
  }, [transportIdQuery]);

  useEffect(() => {
    const refresh = getCookie(CookieKey.REFRESH_TOKEN);
    if (refresh) {
      dispatch(fetchAccessToken({ refresh }));
    }
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchProfile());
    }
  }, [isAuthorized]);

  useEffect(() => {
    setCookieCartItems(CookieKey.CARTITEMS, getSlugsCartItemsFromCart(cart));
  }, [cart, setCookieCartItems]);

  useEffect(() => {
    setCookieTransportId(CookieKey.TRANSPORT_ID, transportId);
  }, [transportId, setCookieTransportId]);

  if (!isLoadingApp) {
    return null;
  }

  return <>{children}</>;
};

export { InitialLoader };
