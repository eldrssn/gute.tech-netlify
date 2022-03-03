import React, { useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { ProductImageGalleryType } from './types';

export const ProductImageGallery: React.FC<ProductImageGalleryType> = ({
  images,
}) => {
  return (
    <div>
      <ImageGallery
        showPlayButton={false}
        items={images}
        useTranslate3D={false}
        showNav={false}
      />
    </div>
  );
};
