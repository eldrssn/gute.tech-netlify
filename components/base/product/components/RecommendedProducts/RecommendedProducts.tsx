import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Slider from 'react-slick';

import { NextArrowButton, PrevArrowButton } from 'components/ui/ArrowButtons';
import { CatalogCard } from 'components/main/CatalogCard';

import { selectTransportId } from 'store/reducers/transport/selectors';
import { selectRecommendedProductsList } from 'store/reducers/catalog/selectors';
import {
  clearRecommendedProductsList,
  fetchRecommendedProductsList,
} from 'store/reducers/catalog/actions';

import styles from './recommendedProducts.module.scss';
import { getSlugs } from './helpers';
import { makeAnArray } from 'utility/helpers';

// TODO: поменять потом на правильные запросы
const RecommendedProducts: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const transportId = useSelector(selectTransportId);
  const { categorySlug } = router.query;
  const allSlugs = makeAnArray(categorySlug);

  const [category, product] = getSlugs(allSlugs);

  useEffect(() => {
    dispatch(
      fetchRecommendedProductsList({
        transportId,
        categorySlug: category,
        productSlug: product,
      }),
    );

    return () => {
      dispatch(clearRecommendedProductsList());
    };
  }, [dispatch, transportId, category, product]);

  const { data: recommendedProducts } = useSelector(
    selectRecommendedProductsList,
  );

  if (!recommendedProducts?.length) {
    return null;
  }

  const sliderSettings = {
    className: styles.slider,
    dots: false,
    infinite: recommendedProducts.length > 2,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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

  return (
    <Box>
      <h2>Вам обязательно понадобятся</h2>
      <Slider {...sliderSettings}>
        {recommendedProducts.map(
          ({ title, slug, price, image, categories }) => (
            <CatalogCard
              key={slug}
              title={title}
              price={price}
              image={image}
              slug={slug}
              categories={categories}
              isSlider
            />
          ),
        )}
      </Slider>
    </Box>
  );
};

export { RecommendedProducts };
