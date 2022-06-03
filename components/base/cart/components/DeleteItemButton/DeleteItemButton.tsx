import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Container, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { resetOrdinalId } from 'store/reducers/cart/actions';

import { TDeleteItemButtonProps } from '../../types';
import styles from './DeleteItemButton.module.scss';

const DeleteItemButton: React.FC<TDeleteItemButtonProps> = ({
  item,
  removeItem,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();

  const confirmedSolution = () => {
    removeItem(item);
    window.document.body.style.overflow = 'auto';
    document.body.style.marginRight = '0px';
    dispatch(resetOrdinalId());
  };

  return (
    <>
      <ModalWrapper isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box component='div' className={styles.confirmedBlock}>
            <Typography className={styles.titleModal}>
              Вы действительно хотите удалить
              <Typography
                sx={{ fontWeight: 'bold' }}
                className={styles.nameProduct}
              >
                &#8222;
                {item.title}&#8220;
              </Typography>{' '}
              из корзины?
            </Typography>
            <Box className={styles.buttonContainer}>
              <Button
                className={cn(styles.btnSolution, styles.btnAccept)}
                onClick={confirmedSolution}
              >
                Ок
              </Button>
              <Button
                className={cn(styles.btnSolution, styles.btnReject)}
                onClick={() => setIsOpenModal(false)}
              >
                Отмена
              </Button>
            </Box>
          </Box>
        </Container>
      </ModalWrapper>
      <Button className={styles.btnDelete} onClick={() => setIsOpenModal(true)}>
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </>
  );
};

export { DeleteItemButton };
