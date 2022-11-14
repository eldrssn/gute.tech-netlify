import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Controller } from 'react-hook-form';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

import { selectPaymentMethods } from 'store/reducers/payment/selectors';
import { TPaymentMethodProps } from 'components/base/payment/types';
import { PaymentMethodValue } from 'api/models/payment';

import styles from './PaymentMethod.module.scss';

const PaymentMethod: React.FC<TPaymentMethodProps> = ({
  control,
  setValue,
}) => {
  const [paymentType, setPaymentType] = useState('');
  const [paymentValue, setPaymentValue] = useState<PaymentMethodValue | null>();
  const paymentMethods = useSelector(selectPaymentMethods);

  const paymentMethod = paymentMethods.find(
    (method) => method.type === paymentType,
  );
  const paymentMethodValues = paymentMethod?.values;

  useEffect(() => {
    if (paymentMethods.length <= 0 && paymentMethods.values.length <= 0) {
      return;
    }

    const firstPaymentMethod = paymentMethods[1];
    const firstPaymentValue = firstPaymentMethod.values[0];

    setValue('paymentMethod', firstPaymentMethod.type);
    setValue('paymentId', firstPaymentValue.id);
  }, [paymentMethods, setValue]);

  useEffect(() => {
    if (paymentMethodValues && paymentMethodValues?.length > 0) {
      return;
    }

    setPaymentValue(null);
  }, [paymentMethodValues]);

  return (
    <Box component='div' className={styles.paymentBox}>
      <Typography variant='h6' className={styles.formHeading}>
        Способ оплаты
      </Typography>
      <Box component='div' className={styles.paymentMethod}>
        <Box className={styles.paymentChoice}>
          <Typography variant='h6' className={styles.formSubtitle}>
            Выберите тип
          </Typography>
          <Controller
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                aria-label='gender'
                onChange={onChange}
                value={value}
                sx={{ width: '100%' }}
              >
                {paymentMethods.map((method) => {
                  const methodType = method.type;

                  if (method.values.length <= 0) {
                    return;
                  }

                  if (value === methodType) {
                    setPaymentType(methodType);
                  }

                  return (
                    <FormControlLabel
                      className={styles.formControlLabel}
                      key={methodType}
                      value={methodType}
                      control={<Radio sx={{ display: 'none' }} />}
                      label={
                        <Box component='div' className={styles.paymentMethod}>
                          <Box
                            className={cn(styles.radioButtonContainer, {
                              [styles.radioButtonActive]: value === methodType,
                            })}
                          >
                            {method.title}
                          </Box>
                        </Box>
                      }
                    />
                  );
                })}
              </RadioGroup>
            )}
            name='paymentMethod'
            control={control}
          />
          {paymentMethodValues && paymentMethodValues.length > 0 && (
            <Box component='div' className={styles.gatewayBox}>
              <Typography variant='h6' className={styles.formSubtitle}>
                Выберите способ
              </Typography>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    aria-label='gender'
                    onChange={onChange}
                    value={value}
                    sx={{ width: '100%' }}
                  >
                    {paymentMethodValues?.map((methodValue) => {
                      const numberValue = Number(value);

                      if (numberValue === methodValue.id) {
                        setPaymentValue(methodValue);
                      }

                      return (
                        <FormControlLabel
                          className={styles.formControlLabel}
                          key={methodValue.id}
                          value={methodValue.id}
                          control={<Radio sx={{ display: 'none' }} />}
                          label={
                            <Box
                              component='div'
                              className={styles.paymentMethod}
                            >
                              <Box
                                className={cn(styles.radioButtonContainer, {
                                  [styles.radioButtonActive]:
                                    numberValue === methodValue.id,
                                })}
                              >
                                {methodValue.title}
                              </Box>
                            </Box>
                          }
                        />
                      );
                    })}
                  </RadioGroup>
                )}
                name='paymentId'
                control={control}
              />
            </Box>
          )}
        </Box>
        {paymentValue && (
          <Box className={styles.infoPayment}>
            {paymentValue?.icons && (
              <Box
                className={styles.imageIconCard}
                dangerouslySetInnerHTML={{ __html: paymentValue?.icons }}
              ></Box>
            )}
            <Typography className={styles.info}>
              {paymentValue?.description}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export { PaymentMethod };
