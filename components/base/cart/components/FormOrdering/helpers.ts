import { UseFormSetError } from 'react-hook-form';

import { CartItemData } from 'store/reducers/cart/types';
import { OrderingErrors } from 'api/models/cart';

import { TFormData, FormKey } from '../../types';

const getCartOrder = (cart: CartItemData[]) =>
  cart
    .filter((item) => item.count > 0)
    .map((item) => ({
      quantity: Number(item.count),
      slug: item.slug,
    }));

const setOrderFormErrors = ({
  errors,
  setError,
  setOtherError,
}: {
  errors: OrderingErrors;
  setError: UseFormSetError<TFormData>;
  setOtherError: (error: string[]) => void;
}) => {
  const { detail, cart, phone, name, email } = errors;

  if (detail) {
    setOtherError([detail]);
  }

  if (cart) {
    setOtherError(cart);
  }

  if (phone) {
    phone.map((error) => {
      setError(FormKey.PHONE_NUMBER, { type: 'custom', message: error });
    });
  }

  if (name) {
    name.map((error) =>
      setError(FormKey.NAME_VALUE, { type: 'custom', message: error }),
    );
  }

  if (email) {
    email.map((error) =>
      setError(FormKey.EMAIL_VALUE, { type: 'custom', message: error }),
    );
  }
};

export { getCartOrder, setOrderFormErrors };
