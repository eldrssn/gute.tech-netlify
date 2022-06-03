import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectCart } from 'store/reducers/cart/selectors';
import { postOrdering } from 'api/routes/cart';

import { DeliveryAddress } from '../DeliveryAddress';
import { ContactInformation } from '../ContactInformation';
import { PaymentMethod } from '../PaymentMethod';
import { TFormData } from '../../types';
import { getCartOrder } from './helpers';
import styles from './FormOrdering.module.scss';

const FormOrdering: React.FC = () => {
  const [otherError, setOtherError] = useState(false);
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

  const cart = useSelector(selectCart);

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
    setOtherError(false);
    postOrdering(postData)
      .then((data) => {
        if (data.payment_url) {
          window.location.href = data.payment_url;
        }
      })
      .catch((e) => {
        const { phone, email } = e.response.data;
        if (phone) {
          setError('phoneNumber', {
            type: 'custom',
            message: phone,
          });
        }

        if (email) {
          setError('emailValue', {
            type: 'custom',
            message: email,
          });
        }

        if (phone || email) {
          return;
        }

        setOtherError(true);
      });
  });

  const isCartItem = cart.length > 0;

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
      {otherError && (
        <Typography className={styles.otherErrorMessage}>
          Произошла ошибка, повторите попытку.
        </Typography>
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
