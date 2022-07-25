import { createAction } from '@reduxjs/toolkit';

import { CartItemData } from 'components/base/cart/types';
import { createAsyncAction } from 'utility/helpers/store';
import { getProductInfoFromSlug } from 'api/routes/cart';
import { ProductRequestData, ProductResponseData } from 'api/models/cart';

const addItemsFromOrder = createAction<CartItemData[]>('addItemsFromOrder');
const clearOrder = createAction('clearOrder');

const fetchItemFromOrder = createAsyncAction<
  ProductResponseData,
  ProductRequestData
>({
  typeAction: 'OrderStore/fetchItemFromOrder',
  request: getProductInfoFromSlug,
  shouldReturnRequestData: true,
});

export { addItemsFromOrder, fetchItemFromOrder, clearOrder };
