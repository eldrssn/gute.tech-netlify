import React, { FC, useRef, useState } from 'react';

import ImageGallery from 'react-image-gallery';
import ReactImageGallery from 'react-image-gallery';
import Box from '@mui/material/Box';

import 'react-image-gallery/styles/css/image-gallery.css';

import { Loader } from 'components/ui/Loader';

import { formatImages } from './helpers';
import { ProductImageGalleryProps } from './types';
import { IMG_CLASSNAME } from './constants';

import styles from './productImageGallery.module.scss';

const ProductImageGallery: FC<ProductImageGalleryProps> = ({
  images,
  title,
}) => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);

  const refImg = useRef<ReactImageGallery | null>(null);

  if (!images) {
    return <Loader />;
  }

  const formattedItems = formatImages(images);

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

  const displayCustomControls = isFullscreen ? 'block' : 'none';

  const renderCustomControls = () => (
    <>
      <Box
        component='span'
        sx={{ display: displayCustomControls }}
        className={styles.closeButton}
        onClick={closeFullscreen}
      />
      <Box
        className={styles.imageDescription}
        sx={{ display: displayCustomControls }}
      >
        {title}
      </Box>
    </>
  );

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
        renderCustomControls={renderCustomControls}
      />
    </Box>
  );
};

export { ProductImageGallery };
