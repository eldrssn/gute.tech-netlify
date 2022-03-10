import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { ICatalogCard } from './types';
import styles from './styles.module.css';

const CatalogCard: React.FC<ICatalogCard> = (props) => (
  <Card
    sx={{ maxWidth: 275, margin: '0.7em', display: 'flex', flexWrap: 'wrap' }}
  >
    <CardMedia
      component='img'
      height='250'
      image={props.picture}
      alt='green iguana'
    />
    <CardContent>
      <Typography
        sx={{ lineHeight: 1 }}
        gutterBottom
        variant='h6'
        component='div'
      >
        {props.title}
      </Typography>
      {/* <Typography variant='body2' color='text.secondary'>
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography> */}
    </CardContent>
    <Box className={styles.catalog_card_actions_panel}>
      <Typography
        sx={{ alignSelf: 'center', paddingLeft: '1.5em' }}
        variant='body2'
        color='text.secondary'
      >
        {props.price}
      </Typography>
      <CardActions>
        <Button variant='contained' size='small'>
          Купить
        </Button>
        <Button variant='contained'>
          <ShoppingCartIcon />
        </Button>
      </CardActions>
    </Box>
  </Card>
);

export default CatalogCard;
