import React, { FC } from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';

import { NextArrowButton, PrevArrowButton } from 'components/ui/ArrowButtons';

// TODO: CatalogCard должна уехать из components/base в components/main
import { CatalogCard } from 'components/base/catalog/CatalogCard';

import styles from './recommendedProducts.module.scss';

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
      <CatalogCard title='1' price='10' image='' slug='aa' />
      <CatalogCard title='2' price='20' image='' slug='bb' />
      <CatalogCard title='3' price='30' image='' slug='cc' />
      <CatalogCard title='4' price='40' image='' slug='dd' />
      <CatalogCard title='5' price='50' image='' slug='ee' />
    </Slider>
  </Box>
);
