import { ReactImageGalleryItem } from 'react-image-gallery';

const formatImages = (images: string[]) =>
  images.reduce((accumulator: ReactImageGalleryItem[], image: string) => {
    const formatedImage = {
      original: image,
      thumbnail: image,
      thumbnailClass: 'customThumbnail',
      originalClass: 'customOriginal',
    };

    return accumulator.length
      ? [...accumulator, formatedImage]
      : [formatedImage];
  }, []);

export { formatImages };
