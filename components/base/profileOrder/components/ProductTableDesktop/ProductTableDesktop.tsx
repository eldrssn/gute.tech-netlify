import React, { useState } from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { ModalWrapper } from 'components/main/ModalWrapper';
import { CloseIcon } from 'components/ui/CloseIcon';
import { formatPrice } from 'utility/helpers';
import { getLinkToProduct } from 'utility/helpers/linkmakers';

import { TableBodyProps } from '../../types';
import styles from './styles.module.scss';

const ProductTableDesktop: React.FC<TableBodyProps> = ({ products }) => {
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
          modalTitle='back-to-order'
        >
          <Container fixed className={styles.wrap}>
            <Box className={styles.closeModal} onClick={closeModal}>
              <CloseIcon fillColor='black' />
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
              <TableCell
                component='th'
                scope='row'
                className={styles.tableBodyName}
              >
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
              </TableCell>
              <TableCell align='right'>{itemPrice}&#8381;</TableCell>
              <TableCell align='right'>{item.quantity}</TableCell>
              <TableCell sx={{ position: 'relative' }} align='right'>
                {countItemsPrice}&#8381;
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};

export { ProductTableDesktop };
