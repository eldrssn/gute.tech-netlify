import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// import { selectPaymentMethods } from 'store/reducers/cart/selectors';
import { useWindowSize } from 'hooks/useWindowSize';
import { TPaymentMethodProps } from 'components/base/cart/types';
import { paymantCardIconPatch } from 'components/base/cart/constants';

import styles from './PaymentMethod.module.scss';

const PaymentMethod: React.FC<TPaymentMethodProps> = () => {
  const { isXSMobile } = useWindowSize();
  // const [paymentType, setPaymentType] = useState('');
  // const paymentMethods = useSelector(selectPaymentMethods);

  // const paymentMethodValue = paymentMethods.find(
  //   (method) => method.payment_type === paymentType,
  // )?.values;

  const imageSize = {
    width: isXSMobile ? 75 : 100,
    height: isXSMobile ? 37 : 50,
  };

  return (
    <Box component='div' className={styles.paymentBox}>
      <Typography variant='h6' className={styles.formHeading}>
        Способ оплаты
      </Typography>
      <Box component='div' className={styles.paymentMethod}>
        <Box
          className={cn(styles.radioButtonContainer, styles.radioButtonActive)}
        >
          Картой онлайн
        </Box>
        <Box className={styles.infoPayment}>
          {paymantCardIconPatch.map((cardIcon) => (
            <Image
              className={styles.imageIconCard}
              src={cardIcon.path}
              key={cardIcon.name}
              alt={cardIcon.name}
              {...imageSize}
            />
          ))}
          <Typography className={styles.info}>
            Для оплаты (ввода реквизитов Вашей карты) Вы будете перенаправлены
            на платёжный шлюз ПАО СБЕРБАНК. Соединение с платёжным шлюзом и
            передача информации осуществляется в защищённом режиме с
            использованием протокола шифрования SSL. В случае если Ваш банк
            поддерживает технологию безопасного проведения интернет-платежей
            Verified By Visa, MasterCard SecureCode, MIR Accept, J-Secure, для
            проведения платежа также может потребоваться ввод специального
            пароля.
          </Typography>
        </Box>
      </Box>
      {/* Добавить при подключении выбора оплаты */}
      {/* <Controller
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            aria-label='gender'
            onChange={onChange}
            value={value}
            sx={{ width: '100%' }}
          >
            {paymentMethods.map((method) => {
              if (value === method.payment_type) {
                setPaymentType(method.payment_type);
              }

              return (
                <FormControlLabel
                  className={styles.formControlLabel}
                  key={method.payment_type}
                  value={method.payment_type}
                  control={<Radio sx={{ display: 'none' }} />}
                  label={
                    <Box component='div' className={styles.paymentMethod}>
                      <Box
                        className={cn(styles.radioButtonContainer, {
                          [styles.radioButtonActive]:
                            value === method.payment_type,
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
      {paymentMethodValue && (
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
                {paymentMethodValue?.map((methodValue) => (
                  <FormControlLabel
                    className={styles.formControlLabel}
                    key={methodValue.gateway}
                    value={methodValue.gateway}
                    control={<Radio sx={{ display: 'none' }} />}
                    label={
                      <Box component='div' className={styles.paymentMethod}>
                        <Box
                          className={cn(styles.radioButtonContainer, {
                            [styles.radioButtonActive]:
                              value === methodValue.gateway,
                          })}
                        >
                          {methodValue.title}
                        </Box>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            )}
            name='paymentGateway'
            control={control}
          />
        </Box>
      )} */}
    </Box>
  );
};

export { PaymentMethod };
