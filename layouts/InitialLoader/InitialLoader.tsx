import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  cookieStorage,
  getSlugsCartItemsFromString,
  getSlugsCartItemsFromCart,
} from 'utility/helpers';
import { CookieKey } from 'constants/types';
import { fetchRegions } from 'store/reducers/regions/actions';
import { selectCart } from 'store/reducers/cart/selectors';
import { fetchItemFromCart } from 'store/reducers/cart/actions';
import { fetchCategoriesTreeList } from 'store/reducers/catalog/actions';
import { fetchShowcase } from 'store/reducers/showcase/actions';

const InitialLoader: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchShowcase());
    dispatch(fetchCategoriesTreeList());
    dispatch(fetchRegions());

    const cartSaved = cookieStorage.getItem(CookieKey.CARTITEMS);

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
  }, [dispatch]);

  useEffect(() => {
    cookieStorage.setItem(CookieKey.CARTITEMS, getSlugsCartItemsFromCart(cart));
  }, [cart]);

  return <>{children}</>;
};

export { InitialLoader };
