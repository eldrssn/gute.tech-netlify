import { ReactImageGalleryItem } from 'react-image-gallery';

const formatImages = (images: string[], title: string) =>
  images.reduce((accumulator: ReactImageGalleryItem[], image: string) => {
    const formatedImage = {
      original: image,
      thumbnail: image,
      thumbnailWidth: 92,
      thumbnailClass: 'customThumbnail',
      originalClass: 'customOriginal',
      description: title,
    };

    return accumulator.length
      ? [...accumulator, formatedImage]
      : [formatedImage];
  }, []);

export { formatImages };
