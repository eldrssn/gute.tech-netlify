import React, { FC, useState } from 'react';

import { ModalWarehouses } from 'components/main/ModalWarehouses';
import { addMockInstallation, getWholeQuantity } from './helpers';
import { ProductQuantityProps } from './types';

import styles from './productQuantity.module.scss';

const ProductQuantity: FC<ProductQuantityProps> = ({ warehouses }) => {
  const [isOpenWarehousesModal, setIsOpenWarehousesModal] = useState(false);
  const quantity = getWholeQuantity(warehouses);

  const isInWarehouses = quantity > 0;

  const handleClick = () => {
    setIsOpenWarehousesModal(true);
  };

  const mockedWarehouses = addMockInstallation(warehouses);

  return (
    <>
      {isOpenWarehousesModal && (
        <ModalWarehouses
          isOpen={isOpenWarehousesModal}
          setIsOpen={setIsOpenWarehousesModal}
          warehouses={mockedWarehouses}
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
