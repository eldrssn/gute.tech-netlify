import React, { FC } from 'react';
import ImgsViewer from 'react-images-viewer';

import { FullscreenGalleryProps } from '../types';

const FullscreenGallery: FC<FullscreenGalleryProps> = ({
  toggleFullscreen,
  images,
  fullscreenIndex,
  slideToIndex,
  isFullscreen,
}) => {
  const nextFullscreenIndex = (fullscreenIndex + 1) % images.length;
  const prevFullscreenIndex =
    (fullscreenIndex + images.length - 1) % images.length;

  const prevButtonPressed = () => {
    slideToIndex(prevFullscreenIndex);
  };

  const nextButtonPressed = () => {
    slideToIndex(nextFullscreenIndex);
  };

  const onClickThumbnail = (index: number) => {
    slideToIndex(index);
  };

  return (
    <ImgsViewer
      imgs={images}
      isOpen={isFullscreen}
      onClickPrev={prevButtonPressed}
      onClickNext={nextButtonPressed}
      onClose={toggleFullscreen}
      currImg={fullscreenIndex}
      onClickThumbnail={onClickThumbnail}
      showThumbnails={true}
      enableKeyboardInput={false}
    />
  );
};

export { FullscreenGallery };
