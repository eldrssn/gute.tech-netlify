import React, { useState } from 'react';
import { useForm, useController } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Button, Box, TextField, Typography } from '@mui/material';

import { getInputRules } from 'utility/helpers';
import { setItemQuantity } from 'store/reducers/cart/actions';
import { TCounterProps, TFormCountData } from 'components/base/cart/types';

import styles from './Counter.module.scss';

const Counter: React.FC<TCounterProps> = ({
  item,
  removeCount,
  addCount,
  stockBalance,
}) => {
  const { handleSubmit, control } = useForm<TFormCountData>();
  const dispatch = useDispatch();
  const countInput = useController({
    name: 'count',
    control,
    rules: { ...getInputRules(), max: stockBalance },
  });

  const [isOpenCountModal, setIsOpenCountModal] = useState(false);

  const IsItemCountZero = item.count === 0;

  const onSubmit = handleSubmit((data) => {
    dispatch(
      setItemQuantity({
        slug: item.slug,
        count: data.count,
      }),
    );
    setIsOpenCountModal(false);
  });

  return (
    <Box className={styles.countContainer}>
      <Box
        component='div'
        className={cn(styles.countModal, {
          [styles.countModalOpen]: isOpenCountModal,
        })}
      >
        <form onSubmit={onSubmit} className={styles.form}>
          <Typography className={styles.titleModal}>
            Введите количество
          </Typography>
          <TextField
            className={styles.input}
            variant='outlined'
            value={countInput.field.value}
            onChange={countInput.field.onChange}
            error={Boolean(countInput.fieldState.error)}
            inputProps={{ maxLength: 3 }}
          />
          <Box className={styles.buttonContainer}>
            <Button
              className={cn(styles.btnSolution, styles.btnAccept)}
              onClick={onSubmit}
            >
              Применить
            </Button>
            <Button
              className={cn(styles.btnSolution, styles.btnReject)}
              onClick={() => setIsOpenCountModal(false)}
            >
              Отмена
            </Button>
          </Box>
        </form>
      </Box>
      <Button
        className={cn(styles.btnCount, styles.btnCountRemove, {
          [styles.btnCountInactive]: IsItemCountZero,
        })}
        onClick={() => removeCount(item)}
      >
        -
      </Button>
      <Box
        onClick={() => setIsOpenCountModal(true)}
        component='div'
        className={styles.count}
      >
        {item.count}
      </Box>
      <Box component='div' className={styles.stockBalance}>
        На складе: {stockBalance}
      </Box>
      <Button
        className={cn(styles.btnCount, styles.btnCountAdd, {
          [styles.btnCountInactive]: item.count >= stockBalance,
        })}
        onClick={() => addCount(item)}
      >
        +
      </Button>
    </Box>
  );
};

export { Counter };
