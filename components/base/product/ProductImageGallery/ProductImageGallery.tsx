import React, { FC } from 'react';
import ImageGallery from 'react-image-gallery';
import { Box } from '@mui/material';

import 'react-image-gallery/styles/css/image-gallery.css';

import { formatImages } from './helpers';
import { ProductImageGalleryProps } from './types';

const ProductImageGallery: FC<ProductImageGalleryProps> = ({ images }) => {
  const galleryItems = formatImages(images);

  return (
    <Box sx={{ maxWidth: { sm: '50%' } }}>
      <ImageGallery
        showPlayButton={false}
        items={galleryItems}
        useTranslate3D={false}
        showNav={false}
      />
    </Box>
  );
};

export { ProductImageGallery };
