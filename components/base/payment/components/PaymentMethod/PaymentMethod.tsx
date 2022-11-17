import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import { RadioGroup, FormControlLabel, Radio, MenuItem } from '@mui/material';

import { selectPaymentMethods } from 'store/reducers/payment/selectors';
import { TPaymentMethodProps } from 'components/base/payment/types';

import styles from './PaymentMethod.module.scss';

const PaymentMethod: React.FC<TPaymentMethodProps> = ({
  control,
  setValue,
}) => {
  const [paymentType, setPaymentType] = useState('');
  const [paymentId, setPaymentId] = useState<number | null>();
  const paymentMethods = useSelector(selectPaymentMethods);

  const paymentMethod = paymentMethods.find(
    (method) => method.type === paymentType,
  );
  const paymentMethodValues = paymentMethod?.values;
  const paymentValue = paymentMethodValues?.find(
    (paymentMethod) => paymentMethod.id === paymentId,
  );

  useEffect(() => {
    if (!paymentMethodValues) {
      return;
    }

    setValue('paymentId', paymentMethodValues[0].id);
  }, [paymentMethodValues, setValue]);

  useEffect(() => {
    if (paymentMethods.length <= 0 && paymentMethods.values.length <= 0) {
      return;
    }

    const firstPaymentMethod = paymentMethods.find(
      (method) => method.values.length > 0,
    );

    if (!firstPaymentMethod) {
      return;
    }

    const firstPaymentValue = firstPaymentMethod.values[0];

    setValue('paymentMethod', firstPaymentMethod.type);
    setValue('paymentId', firstPaymentValue.id);
    setPaymentId(firstPaymentValue.id);
  }, [paymentMethods, setValue]);

  const handleChangePaymentMethod = (event: SelectChangeEvent<number>) => {
    const paymentId = Number(event.target.value);

    setValue('paymentId', paymentId);
    setPaymentId(paymentId);
  };

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
                    setPaymentId(null);
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
            rules={{ required: true }}
          />
          {paymentMethodValues && paymentMethodValues.length > 0 && (
            <Box component='div' className={styles.gatewayBox}>
              <Typography variant='h6' className={styles.formSubtitle}>
                Выберите способ
              </Typography>

              <Controller
                render={({ field }) => (
                  <Select
                    className={styles.selectInput}
                    disabled={paymentMethodValues.length === 0}
                    value={field.value}
                    onChange={(event) => handleChangePaymentMethod(event)}
                  >
                    {paymentMethodValues.map((paymentMethod) => (
                      <MenuItem key={paymentMethod.id} value={paymentMethod.id}>
                        {paymentMethod.title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                name='paymentId'
                control={control}
                rules={{ required: true, min: 1 }}
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
