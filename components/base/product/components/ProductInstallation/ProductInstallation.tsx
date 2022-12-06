import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

import { fetchProductInstallationPrice } from 'store/reducers/product/actions';
import { selectInstallationPriceState } from 'store/reducers/product/selectors';
import { selectSelectedCitySlug } from 'store/reducers/regions/selectors';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { makeAnArray } from 'utility/helpers';

import { getProductSlug } from '../../helpers';
import styles from './productInstallation.module.scss';

const ProductInstallation: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { categorySlug } = router.query;
  const categorySlugAnArray = makeAnArray(categorySlug);
  const сategorySlug = categorySlugAnArray[categorySlugAnArray.length - 2];
  const productSlug = getProductSlug(
    categorySlugAnArray[categorySlugAnArray.length - 1],
  );
  const citySlug = useSelector(selectSelectedCitySlug);
  const transportId = useSelector(selectTransportId);
  const { data, error } = useSelector(selectInstallationPriceState);

  useEffect(() => {
    dispatch(
      fetchProductInstallationPrice({
        сategorySlug,
        productSlug,
        transportId,
        citySlug,
      }),
    );
  }, [сategorySlug, productSlug, transportId, citySlug, dispatch]);

  const installationPrice = data?.installation_price;
  const isInstallationPrice = Boolean(installationPrice);

  return (
    <>
      {isInstallationPrice && !error && (
        <Box className={styles.instalation}>
          <p className={styles.text}>
            Цена за установку: &nbsp;
            <span className={styles.cost}>{installationPrice} руб. </span>
          </p>
        </Box>
      )}
    </>
  );
};

export { ProductInstallation };
