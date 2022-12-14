import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { fetchProductInstallationPrice } from 'store/reducers/product/actions';
import { selectInstallationPriceState } from 'store/reducers/product/selectors';
import { selectSelectedCitySlug } from 'store/reducers/regions/selectors';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { makeAnArray } from 'utility/helpers';

import { Props } from './types';
import { getProductSlug } from '../../helpers';
import styles from './productInstallation.module.scss';

const ProductInstallation: FC<Props> = ({
  withInstallation,
  setWithInstallation,
}) => {
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

  const installationPrice = data?.price;
  const isInstallationPrice = Boolean(installationPrice);

  return (
    <>
      {isInstallationPrice && !error && (
        <Box className={styles.instalation}>
          <FormControlLabel
            className={styles.checkbox}
            label={`Добавить установку (${installationPrice} руб.)`}
            control={
              <Checkbox
                checked={withInstallation}
                onChange={() => setWithInstallation(!withInstallation)}
              />
            }
          />
        </Box>
      )}
    </>
  );
};

export { ProductInstallation };
