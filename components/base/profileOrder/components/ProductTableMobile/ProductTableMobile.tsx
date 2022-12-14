import React, { useState } from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { formatPrice } from 'utility/helpers';
import { getLinkToProduct } from 'utility/helpers/linkmakers';

import { TableBodyProps } from '../../types';
import styles from './styles.module.scss';

const ProductTableMobile: React.FC<TableBodyProps> = ({ products }) => {
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);

  const closeModal = () => {
    setIsModalAlertOpen(false);
  };

  const handleClickTitle = (link: string | null) => {
    if (link) {
      return;
    }

    setIsModalAlertOpen(true);
  };

  return (
    <>
      {isModalAlertOpen && (
        <ModalWrapper
          isOpen={isModalAlertOpen}
          setIsOpen={setIsModalAlertOpen}
          modalTitle='back-order'
        >
          <Container fixed className={styles.wrap}>
            <Box className={styles.closeModal} onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </Box>
            <Typography className={styles.title}>Товар не найден</Typography>
            <Button onClick={closeModal} className={styles.button}>
              Вернуться к заказу
            </Button>
          </Container>
        </ModalWrapper>
      )}
      <TableBody className={styles.tableBody}>
        {products.map((item) => {
          const itemPrice = formatPrice(item.price);
          const countItemsPrice = formatPrice(item.quantity * item.price);
          const product = item.product;
          const link = product
            ? getLinkToProduct({
                categories: product.categories[0],
                productSlug: product.slug,
              })
            : null;

          return (
            <TableRow
              className={styles.tableRow}
              key={item.vendor_code}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row' className={styles.itemInfo}>
                <Typography className={styles.itemTitleBox}>
                  {link ? (
                    <Link href={link} passHref>
                      <a className={styles.itemTitle}>{item.title}</a>
                    </Link>
                  ) : (
                    <Typography
                      className={styles.itemTitle}
                      onClick={() => handleClickTitle(link)}
                    >
                      {item.title}
                    </Typography>
                  )}
                  {item.is_service && (
                    <Typography className={styles.service}>*услуга</Typography>
                  )}
                </Typography>
                <Typography className={styles.itemPrice}>
                  Цена: {itemPrice}&#8381;{' '}
                </Typography>
                <Typography>Количество: {item.quantity}</Typography>
                <Typography className={styles.itemCost}>
                  Стоимость: {countItemsPrice}&#8381;
                </Typography>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};

export { ProductTableMobile };
