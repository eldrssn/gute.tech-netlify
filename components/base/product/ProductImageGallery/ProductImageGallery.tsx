import React, { FC, useState } from 'react';

import ImageGallery from 'react-image-gallery';
import Box from '@mui/material/Box';

import 'react-image-gallery/styles/css/image-gallery.css';

import { Loader } from 'components/ui/Loader';

import { FullscreenGallery } from './components/FullscreenGallery';
import { formatImages } from './helpers';
import { ProductImageGalleryProps } from './types';

const ProductImageGallery: FC<ProductImageGalleryProps> = ({
  images,
  title,
}) => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);

  if (!images) {
    return <Loader />;
  }

  const formattedItems = formatImages(images);

  const toggleFullscreen = () => setFullscreen((isFullscreen) => !isFullscreen);

  return (
    <>
      <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
        <ImageGallery
          showPlayButton={false}
          items={formattedItems}
          onClick={toggleFullscreen}
          showNav={false}
          useBrowserFullscreen={false}
          showFullscreenButton={false}
        />
      </Box>

      {isFullscreen && (
        <FullscreenGallery
          toggleFullscreen={toggleFullscreen}
          images={images}
          title={title}
        />
      )}
    </>
  );
};

export { ProductImageGallery };
