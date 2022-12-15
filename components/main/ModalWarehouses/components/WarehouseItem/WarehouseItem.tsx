import React, { FC, useState } from 'react';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { Checkbox, Tooltip } from '@mui/material';

import { WarehouseProps } from './types';
import styles from './warehouseItem.module.scss';
import { BuyButton } from '../BuyButton';

const WarehouseItem: FC<WarehouseProps> = ({ warehouse }) => {
  const { title, address, city, quantity, installation } = warehouse;
  const [isInstallation, setIsInstallation] = useState(false);

  const handleChange = () => {
    setIsInstallation((isInstallation) => !isInstallation);
  };

  return (
    <article className={styles.warehouseBox}>
      <div className={styles.titleBox}>
        <p className={styles.title}>{title}</p>
        {installation && (
          <Tooltip
            title='В этом филиале возможна установка запчасти'
            placement='right'
          >
            <SettingsSuggestIcon className={styles.titleIcon} />
          </Tooltip>
        )}
      </div>

      <p className={styles.address}>
        г. {city}, {address}
      </p>

      <div className={styles.bottomBox}>
        <BuyButton />
        {installation && (
          <div className={styles.installation}>
            <Checkbox
              size='small'
              value={isInstallation}
              onChange={handleChange}
            />

            <p className={styles.installationLabel}>добавить установку</p>
          </div>
        )}
        <p className={styles.quantity}>Количество: {quantity} шт.</p>
      </div>
    </article>
  );
};

export { WarehouseItem };
