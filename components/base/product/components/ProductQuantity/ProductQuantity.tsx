import React, { FC, useState } from 'react';

import { ProductQuantityProps } from './types';
import styles from './productQuantity.module.scss';
import { ModalWarehouses } from 'components/main/ModalWarehouses';
import { getWholeQuantity } from './helpers';

const ProductQuantity: FC<ProductQuantityProps> = ({ warehouses }) => {
  const [isOpenWarehousesModal, setIsOpenWarehousesModal] = useState(false);
  const quantity = getWholeQuantity(warehouses);

  const isInWarehouses = quantity > 0;

  const handleClick = () => {
    setIsOpenWarehousesModal(true);
  };

  return (
    <>
      {isOpenWarehousesModal && (
        <ModalWarehouses
          isOpen={isOpenWarehousesModal}
          setIsOpen={setIsOpenWarehousesModal}
          warehouses={warehouses}
        />
      )}
      <div className={styles.quantity}>
        {isInWarehouses ? (
          <p>
            {quantity} шт.{' '}
            <button
              onClick={handleClick}
              disabled={false}
              className={styles.button}
            >
              в наличии
            </button>
          </p>
        ) : (
          <p>Нет в наличии</p>
        )}
      </div>
    </>
  );
};

export { ProductQuantity };
