import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { fetchItemFromOrder } from 'store/reducers/order/actions';
import { getProductSlugQuery } from 'components/base/product/helpers';
import { CustomButton } from 'components/ui/CustomButton';

import styles from './buyButton.module.scss';

const BuyButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const productSlug = getProductSlugQuery(router);

  const buyItNow = (event: React.MouseEvent<HTMLButtonElement>) => {
    // sendMetrik('reachGoal', metrics?.button_card_buy, metrics?.metric_id);
    dispatch(fetchItemFromOrder({ productSlug }));
    router.push('/order');
    event.preventDefault();
  };

  return (
    <CustomButton onClick={buyItNow} customStyles={styles.buyButton}>
      Купить
    </CustomButton>
  );
};

export { BuyButton };
