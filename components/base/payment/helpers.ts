import { UseFormSetError } from 'react-hook-form';

import { ProfileResponseData } from 'api/models/user';
import { CartItemData } from 'store/reducers/cart/types';
import { OrderingErrors } from 'api/models/payment';

import { TFormData, FormKey } from './types';

const getOrderList = (cart: CartItemData[]) =>
  cart
    .filter((item) => item.count > 0)
    .map((item) => ({
      quantity: Number(item.count),
      slug: item.slug,
    }));

const setPaymentFormErrors = ({
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

const getDefaultValues = (profile: ProfileResponseData | null) => {
  return {
    paymentMethod: 'CARD',
    paymentGateway: 'SBERBANK',
    phoneNumber: profile?.phone_number ? profile?.phone_number : '',
    nameValue: profile?.first_name ? profile.first_name : '',
    emailValue: profile?.email ? profile?.email : '',
    branch: null,
    branchesData: null,
  };
};

export { getOrderList, setPaymentFormErrors, getDefaultValues };
