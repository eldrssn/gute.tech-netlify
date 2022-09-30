import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import InputMask from 'react-input-mask';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  updateCartItemUnAuthorized,
  updateCartItemAuthorized,
} from 'store/reducers/cart/actions';
import { selectIsAuthorized } from 'store/reducers/authentication/selectors';
import { TCounterProps, TFormCountData } from 'components/base/cart/types';
import { getInputRules } from 'utility/helpers';
import { inputMasks } from 'constants/patterns';

import styles from './Counter.module.scss';

const Counter: React.FC<TCounterProps> = ({
  item,
  stockBalance,
  isLoading,
}) => {
  const { handleSubmit, control, reset } = useForm<TFormCountData>();
  const [isOpenCountModal, setIsOpenCountModal] = useState(false);

  const dispatch = useDispatch();

  const isAuthorized = useSelector(selectIsAuthorized);

  const isItemCountMin = item.quantity <= 1;
  const isItemCountMax = item.quantity >= stockBalance;

  const setQuantity = handleSubmit((data) => {
    if (isLoading) {
      return;
    }

    const quantity = data.count;

    reset({ count: null });
    setIsOpenCountModal(false);

    if (!quantity) {
      return;
    }

    if (isAuthorized)
      dispatch(
        updateCartItemAuthorized([{ product: item.slug, quantity: quantity }]),
      );

    if (!isAuthorized) {
      dispatch(
        updateCartItemUnAuthorized([
          { product: item.slug, quantity: quantity },
        ]),
      );
    }
  });

  const onIncrement = () => {
    if (isItemCountMax || isLoading) {
      return;
    }

    if (isAuthorized)
      dispatch(
        updateCartItemAuthorized([
          { product: item.slug, quantity: item.quantity + 1 },
        ]),
      );

    if (!isAuthorized) {
      dispatch(
        updateCartItemUnAuthorized([
          { product: item.slug, quantity: item.quantity + 1 },
        ]),
      );
    }
  };

  const onDecrement = () => {
    if (isItemCountMin || isLoading) {
      return;
    }

    if (isAuthorized)
      dispatch(
        updateCartItemAuthorized([
          { product: item.slug, quantity: item.quantity - 1 },
        ]),
      );

    if (!isAuthorized) {
      dispatch(
        updateCartItemUnAuthorized([
          { product: item.slug, quantity: item.quantity - 1 },
        ]),
      );
    }
  };

  const openModal = () => {
    setIsOpenCountModal(true);
  };

  const closeModal = () => {
    setIsOpenCountModal(false);
  };

  return (
    <Box className={styles.countContainer}>
      <Box
        className={cn(styles.modalBackground, {
          [styles.countModalOpen]: isOpenCountModal,
        })}
        onClick={closeModal}
      />
      <Box
        component='div'
        className={cn(styles.countModal, {
          [styles.countModalOpen]: isOpenCountModal,
        })}
      >
        <form onSubmit={setQuantity} className={styles.form}>
          <Typography className={styles.titleModal}>
            Введите количество
          </Typography>
          <Controller
            name='count'
            control={control}
            rules={{ ...getInputRules(), max: stockBalance, min: 1 }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputMask
                mask={inputMasks.countMask}
                maskPlaceholder={null}
                value={value ? value : ''}
                onChange={onChange}
                autoComplete='off'
              >
                <TextField
                  className={styles.input}
                  variant='outlined'
                  error={Boolean(error)}
                  autoComplete='off'
                />
              </InputMask>
            )}
          />
          <Box className={styles.buttonContainer}>
            <Button
              className={cn(styles.btnSolution, styles.btnAccept)}
              onClick={setQuantity}
            >
              Применить
            </Button>
            <Button
              className={cn(styles.btnSolution, styles.btnReject)}
              onClick={closeModal}
            >
              Отмена
            </Button>
          </Box>
        </form>
      </Box>

      <Button
        className={cn(styles.btnCount, styles.btnCountRemove, {
          [styles.btnCountInactive]: isItemCountMin || isLoading,
        })}
        onClick={onDecrement}
      >
        -
      </Button>
      <Box onClick={openModal} component='div' className={styles.count}>
        {item.quantity}
      </Box>
      <Box component='div' className={styles.stockBalance}>
        На складе: {stockBalance}
      </Box>
      <Button
        className={cn(styles.btnCount, styles.btnCountAdd, {
          [styles.btnCountInactive]: isItemCountMax || isLoading,
        })}
        onClick={onIncrement}
      >
        +
      </Button>
    </Box>
  );
};

export { Counter };
