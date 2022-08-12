import React, { FC } from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { getLinkToOrderPage } from '../../helpers';
import { formatDate } from 'utility/helpers';

import { Props } from './types';
import styles from './styles.module.scss';

const OrderCard: FC<Props> = ({ order }) => {
  const fullDate = formatDate(new Date(order.created_at));

  const linkToOrderPage = getLinkToOrderPage(order);

  return (
    <Link href={linkToOrderPage} passHref>
      <Card component='article' className={styles.cardContainer}>
        <CardContent className={styles.cardInfo}>
          <Typography className={styles.cardTitle} gutterBottom component='h3'>
            Номер заказа: {order.id}
          </Typography>

          <Typography className={styles.cardDate} gutterBottom component='h3'>
            {fullDate}
          </Typography>

          <Box className={styles.cardBottom}>
            <div className={styles.cardBottom_price}>
              <Typography className={styles.cardPrice}>
                {order.total_price}
              </Typography>
              <Typography className={styles.cardPrice} sx={{}}>
                <i className={styles.icon_ruble} />
              </Typography>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export { OrderCard };
