import { ReactImageGalleryItem } from 'react-image-gallery';

export const formatImages = (images: string[]) =>
  images.reduce((accumulator: ReactImageGalleryItem[], image: string) => {
    const formatedImage = { original: image, thumbnail: image };

    return accumulator.length
      ? [...accumulator, formatedImage]
      : [formatedImage];
  }, []);
