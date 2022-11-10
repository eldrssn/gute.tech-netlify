import React, { FC, useRef, useState } from 'react';

import ImageGallery from 'react-image-gallery';
import ReactImageGallery from 'react-image-gallery';
import Box from '@mui/material/Box';

import 'react-image-gallery/styles/css/image-gallery.css';

import { CustomControls } from './components/CustomControls';
import { formatImages } from './helpers';
import { ProductImageGalleryProps } from './types';
import { IMG_CLASSNAME } from './constants';

const ProductImageGallery: FC<ProductImageGalleryProps> = ({
  images,
  title,
}) => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);

  const refImg = useRef<ReactImageGallery | null>(null);

  const formattedItems = formatImages(
    images?.length ? images : ['/images/no-image.jpeg'],
  );

  const toggleFullscreen = () => setFullscreen((isFullscreen) => !isFullscreen);

  const closeFullscreen = () => {
    if (!refImg.current) {
      return;
    }
    refImg.current.exitFullScreen();
    toggleFullscreen();
  };

  const openFullscreen = (event: React.MouseEvent<HTMLElement>) => {
    if (isFullscreen) {
      const isBackground = !(event.target as Element).classList.contains(
        IMG_CLASSNAME,
      );

      if (isBackground) {
        closeFullscreen();
      }
      return;
    }

    if (!refImg.current) {
      return;
    }
    refImg.current.fullScreen();
    toggleFullscreen();
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '50%' },
      }}
    >
      <ImageGallery
        ref={refImg}
        showPlayButton={false}
        items={formattedItems}
        onClick={openFullscreen}
        showNav={isFullscreen}
        useBrowserFullscreen={false}
        showFullscreenButton={false}
        lazyLoad={true}
        slideOnThumbnailOver={true}
        showIndex={isFullscreen}
        renderCustomControls={() => (
          <CustomControls
            isFullscreen={isFullscreen}
            title={title}
            closeFullscreen={closeFullscreen}
          />
        )}
      />
    </Box>
  );
};

export { ProductImageGallery };
