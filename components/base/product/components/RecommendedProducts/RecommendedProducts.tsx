import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';

import { NextArrowButton, PrevArrowButton } from 'components/ui/ArrowButtons';
import { CatalogCard } from 'components/main/CatalogCard';

import { makeAnArray } from 'utility/helpers';
import { selectTransportId } from 'store/reducers/transport/selectors';
import { selectRecommendedProductsList } from 'store/reducers/product/selectors';
import {
  clearRecommendedProductsList,
  fetchRecommendedProductsList,
} from 'store/reducers/product/actions';

import { getSlugs } from './helpers';
import styles from './recommendedProducts.module.scss';
import { getProductSlugQuery } from '../../helpers';

const Slider = dynamic(() => import('react-slick'));

const RecommendedProducts: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const transportId = useSelector(selectTransportId);
  const { categorySlug } = router.query;
  const allSlugs = makeAnArray(categorySlug);

  const [category] = getSlugs(allSlugs);

  const productSlug = getProductSlugQuery(router);

  useEffect(() => {
    dispatch(
      fetchRecommendedProductsList({
        transportId,
        productSlug,
        categorySlug: category,
      }),
    );

    return () => {
      dispatch(clearRecommendedProductsList());
    };
  }, [dispatch, transportId, category, productSlug]);

  const { data: recommendedProducts } = useSelector(
    selectRecommendedProductsList,
  );

  if (!recommendedProducts?.length) {
    return null;
  }

  const sliderSettings = {
    className: styles.slider,
    dots: false,
    infinite: recommendedProducts.length > 4,
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
          infinite: recommendedProducts.length > 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: recommendedProducts.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: recommendedProducts.length > 1,
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

export default RecommendedProducts;
