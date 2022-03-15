import React, { FC } from 'react';
import { Box } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Props } from './types';

export const ProductImageGallery: FC<Props> = ({ images }) => (
  <Box sx={{ maxWidth: { sm: '50%' } }}>
    <ImageGallery
      showPlayButton={false}
      items={images}
      useTranslate3D={false}
      showNav={false}
    />
  </Box>
);
