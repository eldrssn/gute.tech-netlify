import React, { FC } from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import { NextArrowButton, PrevArrowButton } from 'components/ui/ArrowButtons';
import CatalogCard from 'components/base/catalog/CatalogCard';

import styles from './recommendedProducts.module.css';

export const sliderSettings = {
  className: styles.slider,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  pauseOnHover: true,
  focusOnSelect: true,
  nextArrow: <NextArrowButton />,
  prevArrow: <PrevArrowButton />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

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
