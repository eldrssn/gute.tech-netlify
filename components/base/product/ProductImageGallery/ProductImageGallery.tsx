import React, { FC, useRef, useState } from 'react';

import ImageGallery from 'react-image-gallery';
import ReactImageGallery from 'react-image-gallery';
import Box from '@mui/material/Box';

import 'react-image-gallery/styles/css/image-gallery.css';

import { Loader } from 'components/ui/Loader';

import { FullscreenGallery } from './components/FullscreenGallery';
import { formatImages, formatImagesFullscreen } from './helpers';
import { ProductImageGalleryProps } from './types';

const ProductImageGallery: FC<ProductImageGalleryProps> = ({
  images,
  title,
}) => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);
  const [fullscreenIndex, setFullscreenIndex] = useState<number>(0);

  const refImg = useRef<ReactImageGallery | null>(null);

  const onSlide = (currentIndex: number) => {
    setFullscreenIndex(currentIndex);
  };

  const slideToIndex = (index: number) => {
    if (!refImg.current) {
      return;
    }

    refImg.current.slideToIndex(index);
  };

  if (!images) {
    return <Loader />;
  }

  const formattedItems = formatImages(images);
  const formattedItemsFullscreen = formatImagesFullscreen(images, title);

  const toggleFullscreen = () => {
    setFullscreen((isFullscreen) => !isFullscreen);
  };

  return (
    <>
      <Box
        sx={{
          width: { xs: '100%', sm: '50%' },
          display: isFullscreen ? 'none' : 'block',
        }}
      >
        <ImageGallery
          startIndex={fullscreenIndex}
          ref={refImg}
          showPlayButton={false}
          items={formattedItems}
          onClick={toggleFullscreen}
          showNav={false}
          useBrowserFullscreen={false}
          showFullscreenButton={isFullscreen}
          onBeforeSlide={onSlide}
          lazyLoad={true}
          slideOnThumbnailOver={true}
        />
      </Box>

      {isFullscreen && (
        <FullscreenGallery
          toggleFullscreen={toggleFullscreen}
          fullscreenIndex={fullscreenIndex}
          images={formattedItemsFullscreen}
          slideToIndex={slideToIndex}
          isFullscreen={isFullscreen}
        />
      )}
    </>
  );
};

export { ProductImageGallery };
