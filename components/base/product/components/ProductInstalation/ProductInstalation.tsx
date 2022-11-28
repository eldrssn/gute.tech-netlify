import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { ModalCity } from 'components/main/ModalCity';
import { selectSelectedBranchId } from 'store/reducers/regions/selectors';

import styles from './productInstalation.module.scss';

const ProductInstalation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedBranchId = useSelector(selectSelectedBranchId);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && <ModalCity isOpen={isOpen} setIsOpen={setIsOpen} />}
      <Box className={styles.instalation}>
        {selectedBranchId ? (
          <p className={styles.text}>
            Цена за установку: &nbsp;
            <span className={styles.cost}>{selectedBranchId * 10} руб. </span>
          </p>
        ) : (
          <p className={styles.text}>
            <span onClick={handleClick} className={styles.select}>
              Выберите
            </span>
            &nbsp; с/ц чтобы узнать цену установки
          </p>
        )}
      </Box>
    </>
  );
};

export { ProductInstalation };
