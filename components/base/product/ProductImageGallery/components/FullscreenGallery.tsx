import React, { FC, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { FullscreenGalleryProps } from '../types';

const FullscreenGallery: FC<FullscreenGalleryProps> = ({
  toggleFullscreen,
  images,
  title,
}) => {
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const handleMovePrevRequest = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  };

  const handleMoveNextRequest = () => {
    setPhotoIndex((photoIndex + 1) % images.length);
  };

  const mainSource = images[photoIndex];
  const nextSource = images[(photoIndex + 1) % images.length];
  const prevSource = images[(photoIndex + images.length - 1) % images.length];

  return (
    <Lightbox
      mainSrc={mainSource}
      nextSrc={nextSource}
      prevSrc={prevSource}
      onCloseRequest={toggleFullscreen}
      onMovePrevRequest={handleMovePrevRequest}
      onMoveNextRequest={handleMoveNextRequest}
      imageCaption={title}
    />
  );
};

export { FullscreenGallery };
