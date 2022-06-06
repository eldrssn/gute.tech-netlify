import { ReactImageGalleryItem } from 'react-image-gallery';
import { FormatImagesFullscreen } from './types';

const formatImages = (images: string[]) =>
  images.reduce((accumulator: ReactImageGalleryItem[], image: string) => {
    const formatedImage = {
      original: image,
      thumbnail: image,
      thumbnailWidth: 92,
      thumbnailClass: 'customThumbnail',
      originalClass: 'customOriginal',
    };

    return accumulator.length
      ? [...accumulator, formatedImage]
      : [formatedImage];
  }, []);

const formatImagesFullscreen = (images: string[], title: string) =>
  images.reduce((accumulator: FormatImagesFullscreen[], image: string) => {
    const formatedImage = {
      src: image,
      caption: title,
    };

    return accumulator.length
      ? [...accumulator, formatedImage]
      : [formatedImage];
  }, []);

export { formatImages, formatImagesFullscreen };
