import React, { FC } from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CatalogCard from 'components/CatalogCard';

import { sliderSettings } from './constance';

export const RecommendedProducts: FC = () => (
  <Box>
    <h2>Вам обязательно понадобятся</h2>
    <Slider {...sliderSettings}>
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
    </Slider>
  </Box>
);
