import React, { FC, useRef, useState } from 'react';

import ImageGallery from 'react-image-gallery';
import ReactImageGallery from 'react-image-gallery';
import Box from '@mui/material/Box';
import classnames from 'classnames/bind';

import 'react-image-gallery/styles/css/image-gallery.css';

import { Loader } from 'components/ui/Loader';

import { formatImages } from './helpers';
import { ProductImageGalleryProps } from './types';

import styles from './productImageGallery.module.scss';

const cn = classnames.bind(styles);

const ProductImageGallery: FC<ProductImageGalleryProps> = ({
  images,
  title,
}) => {
  const [isFullscreen, setFullscreen] = useState<boolean>(false);

  const refImg = useRef<ReactImageGallery | null>(null);

  if (!images) {
    return <Loader />;
  }

  const formattedItems = formatImages(images, title);

  const toggleFullscreen = () => setFullscreen((isFullscreen) => !isFullscreen);

  const closeFullscreen = () => {
    if (!refImg.current) {
      return;
    }
    refImg.current.exitFullScreen();
    toggleFullscreen();
  };

  const openFullscreen = () => {
    if (isFullscreen) {
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
        onClick={closeFullscreen}
        sx={{ display: displayCustomControls }}
        className={cn(styles.closeArea, styles.closeArea_up)}
      />
      <Box
        onClick={closeFullscreen}
        sx={{ display: displayCustomControls }}
        className={cn(styles.closeArea, styles.closeArea_left)}
      />
      <Box
        onClick={closeFullscreen}
        sx={{ display: displayCustomControls }}
        className={cn(styles.closeArea, styles.closeArea_right)}
      />
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
