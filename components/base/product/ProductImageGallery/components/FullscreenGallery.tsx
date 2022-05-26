import React, { FC } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { FullscreenGalleryProps } from '../types';

const FullscreenGallery: FC<FullscreenGalleryProps> = ({
  toggleFullscreen,
  images,
  title,
  fullscreenIndex,
  slideToIndex,
}) => {
  const nextFullscreenIndex = (fullscreenIndex + 1) % images.length;
  const prevFullscreenIndex =
    (fullscreenIndex + images.length - 1) % images.length;

  const handleMovePrevRequest = () => {
    slideToIndex(prevFullscreenIndex);
  };

  const handleMoveNextRequest = () => {
    slideToIndex(nextFullscreenIndex);
  };

  return (
    <Lightbox
      mainSrc={images[fullscreenIndex]}
      nextSrc={images[nextFullscreenIndex]}
      prevSrc={images[prevFullscreenIndex]}
      onCloseRequest={toggleFullscreen}
      onMovePrevRequest={handleMovePrevRequest}
      onMoveNextRequest={handleMoveNextRequest}
      imageCaption={title}
    />
  );
};

export { FullscreenGallery };
