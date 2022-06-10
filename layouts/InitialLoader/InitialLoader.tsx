import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import { useRouterQuery } from 'hooks/useRouterQuery';
import {
  getSlugsCartItemsFromString,
  getSlugsCartItemsFromCart,
} from 'utility/helpers';
import { useWindowSize } from 'hooks/useWindowSize';
import { CookieKey } from 'constants/types';
import { fetchRegions } from 'store/reducers/regions/actions';
import { selectCart } from 'store/reducers/cart/selectors';
import { selectTransportId } from 'store/reducers/transport/selectors';
import {
  fetchTransportInfo,
  setTransportId,
} from 'store/reducers/transport/actions';
import { fetchItemFromCart } from 'store/reducers/cart/actions';
import { fetchCategoriesTreeList } from 'store/reducers/catalog/actions';
import { fetchShowcase } from 'store/reducers/showcase/actions';
import { QueryUrl } from 'constants/variables';

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

  useEffect(() => {
    dispatch(fetchShowcase());
    dispatch(fetchCategoriesTreeList());
    dispatch(fetchRegions());

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
  }, [dispatch, cookiesCartItems]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transportIdQuery]);

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
