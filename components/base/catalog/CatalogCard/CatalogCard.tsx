import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { ModalAddedItem } from 'components/main/ModalAddedItem';
import { ProductListData } from 'api/models/catalog';
import { fetchItemFromCart } from 'store/reducers/cart/actions';

import { CustomButton } from 'components/ui/CustomButton';

import styles from './catalogCard.module.scss';

const CatalogCard: React.FC<ProductListData> = ({
  image,
  price,
  slug,
  title,
}) => {
  const [isOpenModalAddedItem, setIsOpenModalAddedItem] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug: categorySlug } = router.query;

  const addItemToBasket = () => {
    dispatch(fetchItemFromCart({ productSlug: slug }));
    setIsOpenModalAddedItem(true);
  };

  const handleClickToBasket = (event: React.MouseEvent<HTMLElement>) => {
    addItemToBasket();
    event.preventDefault();
  };

  return (
    <>
      <ModalAddedItem
        isOpen={isOpenModalAddedItem}
        setIsOpen={setIsOpenModalAddedItem}
        title={title}
      />
      <Card component='article' className={styles.cardContainer}>
        <Link href={`/catalog/${categorySlug}/${slug}`}>
          <a className={styles.cardLinkContainer}>
            <CardMedia
              component={'img'}
              height='250'
              image={image || '/card-example.jpeg'}
              alt={title}
              className={styles.cardImage}
            />

            <CardContent className={styles.cardInfo}>
              <Divider className={styles.cardDivider} />

              <Typography
                className={styles.cardTitle}
                gutterBottom
                component='h3'
              >
                {title}
              </Typography>

              <Box className={styles.cardBottom}>
                <Typography className={styles.cardPrice}>{price} ₽</Typography>

                <CardActions className={styles.cardActions}>
                  <CustomButton customStyles={styles.cardBuyButton}>
                    Купить
                  </CustomButton>

                  <CustomButton
                    customStyles={styles.cardAddToShoppingButton}
                    onClick={handleClickToBasket}
                  >
                    <ShoppingCartIcon />
                  </CustomButton>
                </CardActions>
              </Box>
            </CardContent>
          </a>
        </Link>
      </Card>
    </>
  );
};

export { CatalogCard };
