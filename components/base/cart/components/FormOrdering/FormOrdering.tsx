import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import {
  selectCart,
  selectCreateOrderingStatus,
} from 'store/reducers/cart/selectors';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import {
  createOrderingUnAuthorized,
  createOrderingAuthorized,
} from 'store/reducers/cart/actions';

import { DeliveryAddress } from '../DeliveryAddress';
import { ContactInformation } from '../ContactInformation';
import { PaymentMethod } from '../PaymentMethod';
import { TFormData } from '../../types';
import { getCartOrder, setOrderFormErrors } from './helpers';
import styles from './FormOrdering.module.scss';

const FormOrdering: React.FC = () => {
  const [otherError, setOtherError] = useState<string[]>([]);
  const { handleSubmit, control, setValue, setError } = useForm<TFormData>({
    defaultValues: {
      paymentMethod: 'CARD',
      paymentGateway: 'SBERBANK',
      phoneNumber: '',
      nameValue: '',
      emailValue: '',
      branch: null,
      branchesData: null,
    },
  });

  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  const isAuthorized = useSelector(selectIsAuthorized);
  const createOrderStatus = useSelector(selectCreateOrderingStatus);

  const paymentUrl = createOrderStatus.data?.payment_url;
  const isCreateOrdering = createOrderStatus.isCreateOrdering;
  const errors = createOrderStatus.errorCreateOrdering;

  const onSubmit = handleSubmit((data) => {
    const cartOrder = getCartOrder(cart);
    const postData = {
      name: data.nameValue,
      phone: data.phoneNumber,
      email: data.emailValue,
      payment_type: data.paymentMethod,
      gateway: data.paymentGateway,
      cart: cartOrder,
      branch_office_id: data.branch ? data.branch.id : 0,
    };
    setOtherError([]);

    if (isAuthorized) {
      dispatch(createOrderingAuthorized(postData));
      return;
    }

    dispatch(createOrderingUnAuthorized(postData));
  });

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [isCreateOrdering, paymentUrl]);

  useEffect(() => {
    if (!errors) {
      setOtherError([]);
      return;
    }

    setOrderFormErrors({ setError, errors, setOtherError });
  }, [errors, setError]);

  const isCartItem = cart.length > 0;
  const isOtherError = otherError.length > 0;

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <Typography
        className={styles.formTitle}
        id='modal-modal-title'
        variant='h6'
        component='h2'
        mb={1}
      >
        Оформление заказа
      </Typography>
      <PaymentMethod control={control} />
      <ContactInformation control={control} />
      <DeliveryAddress control={control} setValue={setValue} />
      <Button
        disabled={!isCartItem}
        sx={{ mt: '20px' }}
        onClick={onSubmit}
        variant={'contained'}
      >
        Заказать
      </Button>
      {isOtherError && (
        <>
          {otherError.map((error) => (
            <Typography key={error} className={styles.otherErrorMessage}>
              {error}
            </Typography>
          ))}
          )
        </>
      )}
      <Typography
        className={styles.policy}
        id='modal-modal-title'
        component='p'
        mb={1}
      >
        Нажимая на кнопку «Заказать», вы даете согласие на обработку даных и
        соглашаетесь с <Link href='/policy'>политикой конфиденциальности.</Link>
      </Typography>
    </form>
  );
};

export { FormOrdering };
